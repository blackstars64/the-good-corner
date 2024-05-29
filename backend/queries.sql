-- Drop tables if they exist
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS categorys;

-- Create tables categorys
CREATE TABLE IF NOT EXISTS categorys (
  id integer PRIMARY KEY AUTOINCREMENT,
  category varchar(50) NOT NULL
);

-- Create tables ad
CREATE TABLE IF NOT EXISTS ad (
  id integer PRIMARY KEY AUTOINCREMENT,
  title varchar(100) NOT NULL,
  description text,
  owner varchar(100) NOT NULL,
  price int NOT NULL,
  picture varchar(100) NOT NULL,
  location varchar(100) NOT NULL,
  createdAt date NOT NULL,
  category_id int NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categorys (id)
);

-- Insert data into tables categorys
INSERT INTO categorys (category) VALUES
('Apartment'),
('House'),
('Studio'),
('Penthouse'),
('Loft'),
('Villa'),
('Duplex'),
('Suite'),
('Residence'),
('Flat');

-- Insert data into tables ad
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, category_id) VALUES
('Charming Studio in Bordeaux', 'A beautiful studio in the heart of Bordeaux.', 'Alice Dupont', 650, 'picture1.jpg', 'Bordeaux', '1996-02-16', 3),
('Luxury Apartment in Paris', 'Spacious luxury apartment in central Paris.', 'Jean Martin', 2500, 'picture2.jpg', 'Paris', '1956-05-16', 1),
('Cozy House in Lyon', 'A cozy house perfect for families.', 'Marie Bernard', 1200, 'picture3.jpg', 'Lyon', '2020-09-16', 2),
('Modern Flat in Bordeaux', 'A modern flat with all amenities.', 'Paul Durand', 800, 'picture4.jpg', 'Bordeaux', '1996-09-01', 1),
('Penthouse in Paris', 'A stunning penthouse with a view.', 'Claire Lefevre', 3500, 'picture5.jpg', 'Paris', '1996-02-02', 4),
('Family Home in Lyon', 'A spacious family home with a garden.', 'Luc Besson', 1500, 'picture6.jpg', 'Lyon', '1996-09-16', 2),
('Studio Apartment in Bordeaux', 'A compact studio, great for singles.', 'Elise Moreau', 500, 'picture7.jpg', 'Bordeaux', '1996-09-16', 3),
('Elegant Residence in Paris', 'An elegant residence near the Eiffel Tower.', 'Francois Lambert', 4000, 'picture8.jpg', 'Paris', '2002-04-18', 9),
('Countryside Villa in Lyon', 'A beautiful villa in the countryside.', 'Isabelle Laurent', 2000, 'picture9.jpg', 'Lyon', '2007-04-18', 6),
('Loft in Bordeaux', 'A stylish loft in the city center.', 'Antoine Girard', 1000, 'picture10.jpg', 'Bordeaux', '2010-04-18', 5),
('Historical Flat in Paris', 'A flat in a historical building.', 'Sophie Rolland', 3000, 'picture11.jpg', 'Paris', '2002-01-18', 1),
('Apartment with Balcony in Lyon', 'An apartment with a large balcony.', 'Nicolas Dubois', 1300, 'picture12.jpg', 'Lyon', '2002-09-01', 1),
('City Apartment in Bordeaux', 'An apartment in the heart of the city.', 'Charlotte Leroy', 700, 'picture13.jpg', 'Bordeaux', '2002-04-18', 1),
('Luxury Suite in Paris', 'A luxury suite for high-end living.', 'Julien Robert', 5000, 'picture14.jpg', 'Paris', '2002-04-18', 8),
('Duplex in Lyon', 'A modern duplex with a rooftop terrace.', 'Emilie Morel', 1800, 'picture15.jpg', 'Lyon', '2002-04-18', 7),
('Central Studio in Bordeaux', 'A central studio close to amenities.', 'Pierre Roux', 550, 'picture16.jpg', 'Bordeaux', '2002-04-18', 3),
('Spacious Loft in Paris', 'A spacious loft with a unique design.', 'Manon Fabre', 3200, 'picture17.jpg', 'Paris', '2018-04-18', 5),
('Renovated Home in Lyon', 'A recently renovated home.', 'Alexandre Lefevre', 1400, 'picture18.jpg', 'Lyon', '2002-04-18', 2),
('Apartment Near River in Bordeaux', 'An apartment with river views.', 'Camille Mercier', 900, 'picture19.jpg', 'Bordeaux', '2021-04-18', 1),
('Charming Flat in Paris', 'A charming flat with vintage decor.', 'Mathilde Fournier', 2800, 'picture20.jpg', 'Paris', '2022-08-20', 9);
