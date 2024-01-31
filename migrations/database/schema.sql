CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  profile VARCHAR(255) DEFAULT 'user',
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  date_of_birth DATETIME,
  address VARCHAR(255),
  zip_code VARCHAR(255),
  city VARCHAR(255),
  profile_picture BLOB,
  confirmation_link BOOLEAN,
  confirmation_date_sent DATETIME,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_connection DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL, 
  category VARCHAR(255) NOT NULL,
  picture BLOB,
  description VARCHAR(255)
);

CREATE TABLE products_of_months (
  product_of_month_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  month VARCHAR(255) NOT NULL,
  product_id INTEGER NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE recipes (
  recipe_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  difficulty VARCHAR(255),
  duration VARCHAR(255),
  number_persons INTEGER NOT NULL, 
  instructions VARCHAR(255) NOT NULL,
  utensils VARCHAR(255),
  information VARCHAR(255),
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE quantities (
  quantity_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  quantity_number DECIMAL NOT NULL,
  quantity_label VARCHAR(255) NOT NULL,
  recipe_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE favorites (
  favorite_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  recipe_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);