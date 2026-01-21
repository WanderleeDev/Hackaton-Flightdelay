CREATE TABLE history_batches (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    batch_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);