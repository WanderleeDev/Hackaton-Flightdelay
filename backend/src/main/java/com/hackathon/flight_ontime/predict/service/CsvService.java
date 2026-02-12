package com.hackathon.flight_ontime.predict.service;

import com.hackathon.flight_ontime.history.model.History;
import com.hackathon.flight_ontime.predict.exceptions.CsvInvalidException;
import lombok.RequiredArgsConstructor;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class CsvService {

    private static final int MAX_BATCH_SIZE = 100;

    private static final List<String> VALID_CSV_HEADERS = List.of(
            "airline", "origin", "destination", "departureDate", "distance_km");

    private static final String[] HISTORY_EXPORT_HEADERS = {
            "airline", "origin", "destination", "departureDate", "distance_km", "delay_probability"
    };

    public void exportHistoryToCsv(Stream<History> historyStream, OutputStream outputStream) throws IOException {
        try (Writer writer = new BufferedWriter(
                new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.builder()
                        .setHeader(HISTORY_EXPORT_HEADERS)
                        .build())) {

            for (History history : (Iterable<History>) historyStream::iterator) {
                csvPrinter.printRecord(
                        history.getAirline(),
                        history.getOrigin(),
                        history.getDestination(),
                        history.getDepartureDate(),
                        history.getDistanceKm(),
                        history.getDelayProbability());
            }
            csvPrinter.flush();
        }
    };

    public void validateCsv(MultipartFile file) {
        var isValidExtension = "text/csv".equalsIgnoreCase(file.getContentType()) ||
                "application/vnd.ms-excel".equalsIgnoreCase(file.getContentType());

        if (file.isEmpty() && isValidExtension) {
            throw new CsvInvalidException("Invalid CSV: file must not be empty and content type must be text/csv.");
        }

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.builder()
                                .setHeader()
                                .setSkipHeaderRecord(true)
                                .setTrim(true)
                                .build())) {

            Set<String> actualHeaders = new HashSet<>(csvParser.getHeaderNames());
            System.out.println(csvParser.getHeaderNames());

            if (actualHeaders.size() != VALID_CSV_HEADERS.size() ||
                    !actualHeaders.containsAll(VALID_CSV_HEADERS)) {
                throw new CsvInvalidException("CSV headers must be exactly: " + String.join(", ", VALID_CSV_HEADERS));
            }

            long rowsCount = csvParser.stream().count();
            if (rowsCount == 0 || rowsCount > MAX_BATCH_SIZE) {
                throw new CsvInvalidException(
                        "CSV must contain at least one data row and must not exceed " + MAX_BATCH_SIZE + " rows.");
            }

        } catch (Exception e) {
            if (e instanceof CsvInvalidException csvEx) {
                throw csvEx;
            }

            throw new CsvInvalidException("Unable to read CSV or invalid format.");
        }
    }

    public byte[] enrichCsv(MultipartFile file) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT.builder()
                                .setHeader()
                                .setSkipHeaderRecord(true)
                                .setTrim(true)
                                .build());
                OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8);
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)) {

            List<String> enrichedHeaders = new ArrayList<>(csvParser.getHeaderNames());
            enrichedHeaders.add("day_of_week");
            enrichedHeaders.add("hour");
            csvPrinter.printRecord(enrichedHeaders);

            for (CSVRecord record : csvParser) {
                List<String> enrichedRecord = new ArrayList<>();

                for (String header : csvParser.getHeaderNames()) {
                    enrichedRecord.add(record.get(header));
                }

                String departureDateStr = record.get("departureDate");
                int dayOfWeek = 0;
                int hour = 0;

                if (departureDateStr != null && !departureDateStr.trim().isEmpty()) {
                    try {
                        OffsetDateTime departureDate = OffsetDateTime.parse(departureDateStr);
                        dayOfWeek = departureDate.getDayOfWeek().getValue() % 7;
                        hour = departureDate.getHour();
                    } catch (DateTimeParseException e) {
                        throw new CsvInvalidException("Invalid departureDate format: " + departureDateStr);
                    }
                }

                enrichedRecord.add(String.valueOf(dayOfWeek));
                enrichedRecord.add(String.valueOf(hour));

                csvPrinter.printRecord(enrichedRecord);
            }

            csvPrinter.flush();
            writer.flush();

        } catch (Exception e) {
            throw new CsvInvalidException("Error enriching CSV: " + e.getMessage());
        }

        return outputStream.toByteArray();
    }
}
