-- Table: public.profiles

-- DROP TABLE IF EXISTS public.profiles;

CREATE TABLE IF NOT EXISTS public.profiles (
    profile_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    ssn INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(16) NOT NULL,
    profile_position VARCHAR(3) NOT NULL,
    CONSTRAINT fk_user_email FOREIGN KEY (email) REFERENCES public.users (email) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER TO postgres;
