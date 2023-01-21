--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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

SET default_table_access_method = heap;

--
-- Name: genre; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    "platformId" integer NOT NULL,
    "genreId" integer NOT NULL,
    "watchedStatus" boolean DEFAULT false NOT NULL
);


--
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movies.id;


--
-- Name: platform; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platform (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- Name: platform_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.platform_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: platform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.platform_id_seq OWNED BY public.platform.id;


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- Name: platform id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform ALTER COLUMN id SET DEFAULT nextval('public.platform_id_seq'::regclass);


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genre VALUES (1, 'Ficção científica');
INSERT INTO public.genre VALUES (2, 'Aventura');
INSERT INTO public.genre VALUES (3, 'Mistério');
INSERT INTO public.genre VALUES (4, 'Drama');
INSERT INTO public.genre VALUES (5, 'Terror');
INSERT INTO public.genre VALUES (6, 'Comédia');
INSERT INTO public.genre VALUES (7, 'Comédia romântica');


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.movies VALUES (1, 'Interestelar', 1, 1, true);
INSERT INTO public.movies VALUES (2, 'MIB: Homens de Preto', 2, 2, false);
INSERT INTO public.movies VALUES (5, 'Shrek', 2, 6, false);
INSERT INTO public.movies VALUES (6, 'Minions 2: A Origem de Gru', 1, 6, false);
INSERT INTO public.movies VALUES (7, 'O Telefone Preto', 1, 5, false);
INSERT INTO public.movies VALUES (8, 'Terrifier', 1, 5, false);
INSERT INTO public.movies VALUES (9, 'Superman - O Filme', 1, 2, false);
INSERT INTO public.movies VALUES (10, 'A Pele Que Habito', 3, 4, false);
INSERT INTO public.movies VALUES (11, 'Se Beber, Não Case!', 3, 6, false);
INSERT INTO public.movies VALUES (12, 'Homem de Ferro 3', 5, 2, false);
INSERT INTO public.movies VALUES (13, 'Thor: Ragnarok', 5, 2, false);
INSERT INTO public.movies VALUES (14, 'Vingadores', 5, 2, false);
INSERT INTO public.movies VALUES (4, 'Pixels', 2, 2, false);
INSERT INTO public.movies VALUES (15, 'Viúva Negra', 5, 2, false);


--
-- Data for Name: platform; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.platform VALUES (1, 'Prime Video');
INSERT INTO public.platform VALUES (2, 'Netflix');
INSERT INTO public.platform VALUES (3, 'HBO max');
INSERT INTO public.platform VALUES (4, 'Apple Tv');
INSERT INTO public.platform VALUES (5, 'Disney+');
INSERT INTO public.platform VALUES (6, 'GloboPlay');
INSERT INTO public.platform VALUES (7, 'Discovery+');


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genre_id_seq', 7, true);


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movie_id_seq', 15, true);


--
-- Name: platform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.platform_id_seq', 7, true);


--
-- Name: genre genre_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_name_key UNIQUE (name);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: movies movie_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- Name: platform platform_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform
    ADD CONSTRAINT platform_name_key UNIQUE (name);


--
-- Name: platform platform_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform
    ADD CONSTRAINT platform_pkey PRIMARY KEY (id);


--
-- Name: movies movie_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movie_fk0 FOREIGN KEY ("platformId") REFERENCES public.platform(id);


--
-- Name: movies movie_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movie_fk1 FOREIGN KEY ("genreId") REFERENCES public.genre(id);


--
-- PostgreSQL database dump complete
--

