-- Run this SQL in your Supabase SQL Editor to enable Rate Limiting

-- 1. Create the rate_limits table
CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER DEFAULT 1,
    last_request BIGINT -- Using epoch seconds
);

-- 2. Enable RLS (Optional, but good practice if exposed, though we use security definer function)
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- 3. Create the function to check rate limits atomically
CREATE OR REPLACE FUNCTION check_rate_limit(
    request_key TEXT,
    max_requests INTEGER,
    window_seconds INTEGER
) RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator (bypass RLS for this system function)
AS $$
DECLARE
    current_time BIGINT;
    record_exists BOOLEAN;
    current_count INTEGER;
    last_req BIGINT;
BEGIN
    current_time := CAST(EXTRACT(EPOCH FROM NOW()) AS BIGINT);
    
    SELECT EXISTS(SELECT 1 FROM rate_limits WHERE key = request_key) INTO record_exists;
    
    IF record_exists THEN
        SELECT count, last_request INTO current_count, last_req FROM rate_limits WHERE key = request_key;
        
        IF (current_time - last_req) > window_seconds THEN
            -- Window expired, reset counter
            UPDATE rate_limits 
            SET count = 1, last_request = current_time 
            WHERE key = request_key;
            
            RETURN json_build_object(
                'success', true, 
                'remaining', max_requests - 1, 
                'reset', current_time + window_seconds
            );
        ELSIF current_count >= max_requests THEN
            -- Limit exceeded
            RETURN json_build_object(
                'success', false, 
                'remaining', 0, 
                'reset', last_req + window_seconds
            );
        ELSE
            -- Within window and limit, increment
            UPDATE rate_limits 
            SET count = count + 1 
            WHERE key = request_key;
            
            RETURN json_build_object(
                'success', true, 
                'remaining', max_requests - (current_count + 1), 
                'reset', last_req + window_seconds
            );
        END IF;
    ELSE
        -- New Record
        INSERT INTO rate_limits (key, count, last_request) 
        VALUES (request_key, 1, current_time);
        
        RETURN json_build_object(
            'success', true, 
            'remaining', max_requests - 1, 
            'reset', current_time + window_seconds
        );
    END IF;
END;
$$;
