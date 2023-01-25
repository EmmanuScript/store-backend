/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    products_id integer REFERENCES products(id),
    quantity integer,
    user_id integer REFERENCES users(id),
    status VARCHAR(250)
);