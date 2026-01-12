CREATE TABLE airlines (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    CONSTRAINT pk_airlines PRIMARY KEY (id),
    CONSTRAINT uc_airlines_name UNIQUE (name),
    CONSTRAINT uc_airlines_code UNIQUE (code)
);
