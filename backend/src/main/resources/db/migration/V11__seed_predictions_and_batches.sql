-- Insert Batch 1 (Recent)
WITH batch_1 AS (
    INSERT INTO history_batches (batch_name, created_at)
    VALUES ('Lote de Predicciones Recientes - Enero 2026', NOW())
    RETURNING id
)
INSERT INTO histories (airline, origin, destination, departure_date, distance_km, delay_prediction, delay_probability, created_at, batch_id)
SELECT 'AA', 'JFK', 'LHR', NOW() + INTERVAL '1 day', 5500.0, 0.0, 0.15, NOW(), id FROM batch_1
UNION ALL
SELECT 'DL', 'ATL', 'CDG', NOW() + INTERVAL '2 day', 6000.0, 1.0, 0.85, NOW(), id FROM batch_1
UNION ALL
SELECT 'UA', 'SFO', 'HND', NOW() + INTERVAL '3 day', 8000.0, 0.0, 0.25, NOW(), id FROM batch_1
UNION ALL
SELECT 'BA', 'LHR', 'JFK', NOW() + INTERVAL '1 day', 5500.0, 0.0, 0.10, NOW(), id FROM batch_1;

-- Insert Batch 2 (Last Week)
WITH batch_2 AS (
    INSERT INTO history_batches (batch_name, created_at)
    VALUES ('Analisis de Vuelos - Semana Pasada', NOW() - INTERVAL '7 days')
    RETURNING id
)
INSERT INTO histories (airline, origin, destination, departure_date, distance_km, delay_prediction, delay_probability, created_at, batch_id)
SELECT 'IB', 'MAD', 'EZE', NOW() - INTERVAL '6 days', 10000.0, 1.0, 0.75, NOW() - INTERVAL '7 days', id FROM batch_2
UNION ALL
SELECT 'LA', 'SCL', 'MIA', NOW() - INTERVAL '5 days', 7000.0, 0.0, 0.05, NOW() - INTERVAL '7 days', id FROM batch_2
UNION ALL
SELECT 'AM', 'MEX', 'LAX', NOW() - INTERVAL '5 days', 2500.0, 1.0, 0.60, NOW() - INTERVAL '7 days', id FROM batch_2;

-- Insert Batch 3 (Older)
WITH batch_3 AS (
    INSERT INTO history_batches (batch_name, created_at)
    VALUES ('Reporte Mensual - Diciembre 2025', NOW() - INTERVAL '30 days')
    RETURNING id
)
INSERT INTO histories (airline, origin, destination, departure_date, distance_km, delay_prediction, delay_probability, created_at, batch_id)
SELECT 'AF', 'CDG', 'GIG', NOW() - INTERVAL '29 days', 9000.0, 0.0, 0.20, NOW() - INTERVAL '30 days', id FROM batch_3
UNION ALL
SELECT 'LH', 'FRA', 'GRU', NOW() - INTERVAL '28 days', 9500.0, 0.0, 0.30, NOW() - INTERVAL '30 days', id FROM batch_3
UNION ALL
SELECT 'QF', 'SYD', 'LAX', NOW() - INTERVAL '28 days', 12000.0, 1.0, 0.90, NOW() - INTERVAL '30 days', id FROM batch_3
UNION ALL
SELECT 'EK', 'DXB', 'JFK', NOW() - INTERVAL '27 days', 11000.0, 0.0, 0.12, NOW() - INTERVAL '30 days', id FROM batch_3;

-- Insert some individual predictions without batch (Optional, if system supports it, but schema says batch_id is nullable)
INSERT INTO histories (airline, origin, destination, departure_date, distance_km, delay_prediction, delay_probability, created_at, batch_id)
VALUES 
('AV', 'BOG', 'MIA', NOW(), 2400.0, 0.0, 0.18, NOW(), NULL),
('CM', 'PTY', 'YYZ', NOW(), 3500.0, 1.0, 0.65, NOW(), NULL);
