/**
 * Generates a CSV template for batch flight predictions
 * @returns Blob containing the CSV template
 */
export function generateCSVTemplate(): Blob {
    const headers = ["airline", "origin", "destination", "departureDate", "distanceKm"];
    const exampleRows = [
        ["AA", "KJFK", "KLAX", "2026-01-20T10:00:00Z", "3983"],
        ["DL", "SKBO", "EGLL", "2026-01-21T14:30:00Z", "8500"],
        ["UA", "KSFO", "KJFK", "2026-01-22T08:15:00Z", "4139"],
    ];

    const csvContent = [
        headers.join(","),
        ...exampleRows.map(row => row.join(","))
    ].join("\n");

    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
}

/**
 * Downloads the CSV template file
 */
export function downloadCSVTemplate(): void {
    const blob = generateCSVTemplate();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flight_batch_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
