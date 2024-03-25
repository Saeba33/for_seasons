CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  profile ENUM('administrator', 'user') DEFAULT 'user',
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(1000) NOT NULL,
  date_of_birth DATE,
  address VARCHAR(255),
  zip_code VARCHAR(10),
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
  category ENUM('fruits', 'vegetables', 'other') NOT NULL,
  picture TEXT,
  description TEXT,
  informations TEXT,
  varieties VARCHAR(255),
  other VARCHAR (500)
);

CREATE TABLE products_of_month (
  product_of_month_id INTEGER PRIMARY KEY AUTO_INCREMENT,
 month ENUM('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december') NOT NULL,
  product_id INTEGER NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE recipes (
  recipe_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  photo TEXT,
  difficulty ENUM('easy', 'medium', 'hard'),
  duration VARCHAR(50),
  number_persons INTEGER NOT NULL, 
  instructions TEXT NOT NULL,
  ustensils VARCHAR(255),
  information TEXT,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE recipes_products_quantities (
  quantity_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  quantity DECIMAL NOT NULL,
  unit VARCHAR(255) NOT NULL,
  recipe_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE favorites (
  favorite_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  recipe_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);






