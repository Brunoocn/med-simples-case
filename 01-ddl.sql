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
create table professional (
  id bigserial primary key,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  name text not null
);
create table customer (
  id bigserial primary key,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  name text not null
);
create table appointment (
  id bigserial primary key,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  professional_id bigint references professional(id) not null,
  customer_id bigint references customer(id) not null,
  datetime timestamp not null,
  status varchar(20) not null default 'CONFIRMED'
);