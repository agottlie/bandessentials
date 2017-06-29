DROP TABLE IF EXISTS venues CASCADE;
DROP TABLE IF EXISTS bands CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS tours CASCADE;

CREATE TABLE restaurants (
	id SERIAL PRIMARY KEY,
	food_type VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(2),
	lat FLOAT(53),
	long FLOAT(53),
	rating VARCHAR(255)
);

CREATE TABLE venues (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(2),
	lat FLOAT(53),
	long FLOAT(53),
	food_type VARCHAR(255),
	restaurant_id INTEGER REFERENCES restaurants
);

CREATE TABLE bands (
 	id SERIAL PRIMARY KEY,
  	password_digest VARCHAR NOT NULL,
  	name VARCHAR(255)
);

CREATE TABLE tours (
	id SERIAL PRIMARY KEY,
	tour_date VARCHAR(255),
	venue_id INTEGER REFERENCES venues,
	band_id INTEGER REFERENCES bands
);