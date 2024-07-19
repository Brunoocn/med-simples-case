set statement_timeout = 0;
set lock_timeout = 0;
set idle_in_transaction_session_timeout = 0;
set client_encoding = 'UTF8';
set standard_conforming_strings = on;
set check_function_bodies = false;
set xmloption = content;
set client_min_messages = warning;
set row_security = off;
set default_tablespace = '';
set default_table_access_method = heap;
insert into professional (name)
values ('Daniel Roth'),
    ('Guilherme Machado');
insert into customer (name)
values ('John Doe'),
    ('Jane Doe'),
    ('Alice Doe'),
    ('Bob Doe'),
    ('Charlie Doe'),
    ('David Doe');
    
INSERT INTO appointment (
        datetime,
        professional_id,
        customer_id,
        status
    )
VALUES ('2024-01-01T10:00Z', 1, 1, 'CONFIRMED'),
    ('2024-01-01T11:00Z', 1, 2, 'CONFIRMED'),
    ('2024-01-01T12:00Z', 1, 3, 'CONFIRMED'),
    ('2024-01-01T13:00Z', 1, 4, 'CONFIRMED'),
    ('2024-01-01T14:00Z', 1, 5, 'CONFIRMED'),
    ('2024-01-01T21:00Z', 2, 6, 'CONFIRMED');