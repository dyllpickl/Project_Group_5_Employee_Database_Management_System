-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL PRIMARY KEY
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER TO postgres;