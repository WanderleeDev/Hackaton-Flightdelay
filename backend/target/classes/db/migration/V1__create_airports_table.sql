CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE airports (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    iata VARCHAR(3) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL,
    CONSTRAINT pk_airports PRIMARY KEY (id),
    CONSTRAINT uc_airports_iata UNIQUE (iata)
);
