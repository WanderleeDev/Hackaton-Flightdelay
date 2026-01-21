ALTER TABLE histories
ADD COLUMN batch_id UUID;

ALTER TABLE histories
ADD CONSTRAINT fk_histories_batches
    FOREIGN KEY (batch_id)
    REFERENCES history_batches(id)
    ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_histories_batch_id ON histories(batch_id);
