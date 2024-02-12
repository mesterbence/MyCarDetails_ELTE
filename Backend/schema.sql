
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
                             id bigint NOT NULL,
                             numberplate character varying NOT NULL,
                             owner bigint NOT NULL,
                             brand character varying,
                             model character varying,
                             fuel_type integer
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cars ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- Name: cost_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cost_types (
                                   id integer NOT NULL,
                                   name character varying NOT NULL
);


ALTER TABLE public.cost_types OWNER TO postgres;

--
-- Name: cost_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cost_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cost_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- Name: costs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.costs (
                              id bigint NOT NULL,
                              type integer,
                              car bigint NOT NULL,
                              price integer,
                              mileage integer,
                              note text,
                              date date,
                              title character varying NOT NULL
);


ALTER TABLE public.costs OWNER TO postgres;

--
-- Name: costs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.costs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.costs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- Name: fuel_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fuel_types (
                                   id integer NOT NULL,
                                   name character varying NOT NULL
);


ALTER TABLE public.fuel_types OWNER TO postgres;

INSERT INTO public.fuel_type (id,name)
VALUES
    (1,'Benzin'),
    (2,'Dízel'),
    (3,'Elektromos');


--
-- Name: fuel_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fuel_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fuel_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- Name: fuelings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fuelings (
                                 id bigint NOT NULL,
                                 cost bigint NOT NULL,
                                 quantity double precision NOT NULL,
                                 type character varying,
                                 ispremium boolean,
                                 isfull boolean DEFAULT false NOT NULL
);


ALTER TABLE public.fuelings OWNER TO postgres;

--
-- Name: fueling_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fuelings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fueling_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
                                 id bigint NOT NULL,
                                 car bigint NOT NULL,
                                 date date,
                                 mileage integer,
                                 note text,
                                 done boolean
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.services ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
                              id bigint NOT NULL,
                              username character varying NOT NULL,
                              password character varying NOT NULL,
                              email character varying NOT NULL,
                              role character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );

--
-- Data for Name: cost_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cost_types (name)
VALUES
    ('vételár'),
    ('üzemanyag'),
    ('éves'),
    ('felmerülő'),
    ('biztosítás'),
    ('extra'),
    ('egyéb'),
    ('információ'),
    ('autópályamatrica');



--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- Name: cost_types cost_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_types
    ADD CONSTRAINT cost_types_pkey PRIMARY KEY (id);


--
-- Name: costs costs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT costs_pkey PRIMARY KEY (id);


--
-- Name: fuel_types fuel_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel_types
    ADD CONSTRAINT fuel_types_pkey PRIMARY KEY (id);


--
-- Name: fuelings fueling_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuelings
    ADD CONSTRAINT fueling_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: services fk1avnk61fguqm7i66l03uyxuj3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT fk1avnk61fguqm7i66l03uyxuj3 FOREIGN KEY (car) REFERENCES public.cars(id);


--
-- Name: cars fk6n37puiikmpdouubabtcqjclm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT fk6n37puiikmpdouubabtcqjclm FOREIGN KEY (owner) REFERENCES public.users(id);


--
-- Name: costs fk9vnk5tpkcy1r8v3muj93brc3h; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT fk9vnk5tpkcy1r8v3muj93brc3h FOREIGN KEY (car) REFERENCES public.cars(id);


--
-- Name: costs fkl4y55o5278rn8ac6k9m1s7p53; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT fkl4y55o5278rn8ac6k9m1s7p53 FOREIGN KEY (type) REFERENCES public.cost_types(id);


--
-- Name: cars fku63kf22eo9u6wugf9yltkn4q; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT fku63kf22eo9u6wugf9yltkn4q FOREIGN KEY (fuel_type) REFERENCES public.fuel_types(id);


--
-- Name: TABLE cars; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.cars TO mycardetails;


--
-- Name: TABLE cost_types; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.cost_types TO mycardetails;


--
-- Name: TABLE costs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.costs TO mycardetails;


--
-- Name: TABLE fuel_types; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.fuel_types TO mycardetails;


--
-- Name: TABLE fuelings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.fuelings TO mycardetails;


--
-- Name: TABLE services; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.services TO mycardetails;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO mycardetails;


--
-- PostgreSQL database dump complete
--

