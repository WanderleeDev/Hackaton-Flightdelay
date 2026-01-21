-- GENERATE MORE DATA FOR PAGINATION (Batch 4 to 24)
-- Using a DO block to generate 20 more batches with random data
DO $$
DECLARE
    new_batch_id uuid;
    i integer;
    random_delay_prob double precision;
    random_prediction double precision;
    random_airline text;
    -- Arrays of possible values
    airlines text[] := ARRAY['AA', 'DL', 'UA', 'BA', 'IB', 'LA', 'AF', 'LH', 'QF', 'EK', 'AV', 'CM', 'KL', 'JJ', 'AR'];
    origins text[] := ARRAY['JFK', 'LHR', 'CDG', 'HND', 'MAD', 'EZE', 'SCL', 'MIA', 'MEX', 'LAX', 'BOG', 'PTY', 'YYZ', 'GRU', 'LIM'];
    destinations text[] := ARRAY['DXB', 'FRA', 'GRU', 'SYD', 'BOG', 'PTY', 'YYZ', 'ATL', 'SFO', 'NYC', 'JFK', 'LHR', 'CDG', 'HND', 'MCO'];
BEGIN
    FOR i IN 1..20 LOOP
        -- Create a new batch
        -- Use different timestamps to spread them out
        INSERT INTO history_batches (batch_name, created_at)
        VALUES ('Lote Simulado #' || i, NOW() - (i || ' days')::INTERVAL)
        RETURNING id INTO new_batch_id;

        -- Insert 3-8 predictions for this batch (random amount)
        FOR j IN 1..(3 + floor(random() * 6)::int) LOOP
            random_delay_prob := round((random())::numeric, 2);
            IF random_delay_prob > 0.5 THEN
                random_prediction := 1.0;
            ELSE
                random_prediction := 0.0;
            END IF;
            
            random_airline := airlines[1 + floor(random() * array_length(airlines, 1))::int];

            INSERT INTO histories (
                airline, origin, destination, departure_date, 
                distance_km, delay_prediction, delay_probability, 
                created_at, batch_id
            )
            VALUES (
                random_airline,
                origins[1 + floor(random() * array_length(origins, 1))::int],
                destinations[1 + floor(random() * array_length(destinations, 1))::int],
                NOW() + (floor(random() * 30) || ' days')::INTERVAL,
                500 + floor(random() * 12000),
                random_prediction,
                random_delay_prob,
                NOW(),
                new_batch_id
            );
        END LOOP;
    END LOOP;
END $$;
