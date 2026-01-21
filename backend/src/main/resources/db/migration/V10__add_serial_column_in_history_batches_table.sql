ALTER TABLE history_batches
ADD COLUMN serial_number SERIAL UNIQUE NOT NULL;
