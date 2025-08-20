-- ===========================================
-- DATABASE SCHEMA (Supabase / PostgreSQL)
-- ===========================================
-- Simpel schema met producten, bestellingen en logs.
-- Dit is geschikt voor een hobby webwinkel met lage belasting.

-- Verwijder bestaande tabellen als ze bestaan (voor development)
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;

-- Tabel voor producten
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    -- Drie extra artikelvelden voor jouw eigen gebruik
    article1 TEXT,
    article2 TEXT,
    article3 TEXT
);

-- Index om later sneller te kunnen zoeken/sorteren op naam
CREATE INDEX idx_products_name ON products (name);

-- Tabel voor bestellingen
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    -- Winkelmand wordt als JSON opgeslagen zodat het simpel blijft
    cart JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabel voor eenvoudige logging voor je dashboard
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    level TEXT NOT NULL,            -- bijv. 'info', 'error'
    message TEXT NOT NULL,          -- wat is er gebeurd
    context JSONB,                  -- optionele extra data
    created_at TIMESTAMP DEFAULT NOW()
);

-- Kleine helper index
CREATE INDEX idx_logs_created_at ON logs (created_at DESC);
