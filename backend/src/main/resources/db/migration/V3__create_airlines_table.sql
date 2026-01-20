CREATE TABLE airlines (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL,
    CONSTRAINT pk_airlines PRIMARY KEY (id),
    CONSTRAINT uc_airlines_name UNIQUE (name),
    CONSTRAINT uc_airlines_code UNIQUE (code)
);
