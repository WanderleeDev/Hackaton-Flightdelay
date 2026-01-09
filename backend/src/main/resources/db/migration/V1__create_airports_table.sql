CREATE TABLE airports (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    iata VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    CONSTRAINT pk_airports PRIMARY KEY (id),
    CONSTRAINT uc_airports_iata UNIQUE (iata)
);
