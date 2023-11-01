/* CREATE DATABASE projectUsers;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    email TEXT
);

INSERT INTO users(name, email)
    VALUES  ('Alejandro', 'alejandropuca0@gmail.com'),
            ('Juan', 'juancyepest@gmail.com'),
            ('Lorena','loretamayogarcia@gmail.com'),
            ('Sergio','sejaveta@deltec.com');
 */

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(60),
  price NUMERIC(8,2)
);

INSERT INTO product(name,price)
    VALUES  ('XIaomi',900.00),
            ('iPhone',1200.00);

ALTER TABLE users ADD COLUMN age INT;
