-- Create flights table to link origin and destination airports
CREATE TABLE flights (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    origin_iata VARCHAR(3) NOT NULL,
    destination_iata VARCHAR(3) NOT NULL,
    airline_code VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL,
    CONSTRAINT pk_flights PRIMARY KEY (id),
    CONSTRAINT fk_flights_origin FOREIGN KEY (origin_iata) REFERENCES airports(iata),
    CONSTRAINT fk_flights_destination FOREIGN KEY (destination_iata) REFERENCES airports(iata),
    CONSTRAINT fk_flights_airline FOREIGN KEY (airline_code) REFERENCES airlines(code)
);

-- Create index for faster queries by origin
CREATE INDEX idx_flights_origin ON flights(origin_iata);
CREATE INDEX idx_flights_destination ON flights(destination_iata);
