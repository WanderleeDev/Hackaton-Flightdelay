CREATE TABLE predictions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    airline VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departure_date TIMESTAMP WITH TIME ZONE NOT NULL,
    distance_km DOUBLE PRECISION,
    delay_prediction DOUBLE PRECISION NOT NULL,
    delay_probability DOUBLE PRECISION NOT NULL,
    date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL
);