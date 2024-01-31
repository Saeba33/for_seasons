import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { db as database } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seed = async () => {
  try {
    const queries = [];

    await database.query("delete from products");
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (1, 'Poire', 'fruits', 'Description de la poire.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (2, 'Clémentine', 'fruits', 'Description de la clémentine.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (3, 'Banane', 'fruits', 'Description de la banane.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (4, 'Pomme', 'fruits', 'Description de la pomme.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (5, 'Kiwi', 'fruits', 'Description du kiwi.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (6, 'Raisin', 'fruits', 'Description du raisin.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (7, 'Citron', 'fruits', 'Description du citron.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (8, 'Nectarine', 'fruits', 'Description de la nectarine.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (9, 'Groseille', 'fruits', 'Description de la groseille.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (10, 'Pomme', 'fruits', 'Description de la pomme.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (11, 'Abricot', 'fruits', 'Description de labricot.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (12, 'Pastèque', 'fruits', 'Description de la pastèque.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (13, 'Fraise', 'fruits', 'Description de la fraise.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (14, 'Cerise', 'fruits', 'Description de la cerise.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (15, 'Rhubarbe', 'fruits', 'Description de la rhubarbe.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (16, 'Melon', 'fruits', 'Description du melon.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (17, 'Cassis', 'fruits', 'Description du cassis.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (18, 'Grenade', 'fruits', 'Description de la grenade.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (19, 'Ananas', 'fruits', 'Description de lananas.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (20, 'Mirabelle', 'fruits', 'Description de la mirabelle.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (21, 'Myrtille', 'fruits', 'Description de la myrtille.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (22, 'Pamplemousse', 'fruits', 'Description du pamplemousse.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (23, 'Prune', 'fruits', 'Description de la prune.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (24, 'Mûre', 'fruits', 'Description de la mûre.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (25, 'Figue', 'fruits', 'Description de la figue.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (26, 'Physalis', 'fruits', 'Description du physalis.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (27, 'Pruneau', 'fruits', 'Description du pruneau.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (28, 'Kaki', 'fruits', 'Description du kaki.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (29, 'Noisette', 'fruits', 'Description de la noisette.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (30, 'Framboise', 'fruits', 'Description de la framboise.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (31, 'Mangue', 'fruits', 'Description de la mangue.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (32, 'Grenadille', 'fruits', 'Description de la grenadille.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (33, 'Anone', 'fruits', 'Description de lanone.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (34, 'Coing', 'fruits', 'Description du coing.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (35, 'Orange', 'fruits', 'Description de lorange.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (36, 'Mandarine', 'fruits', 'Description de la mandarine.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (37, 'Chou frisé', 'légumes', 'Description du chou frisé.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (38, 'Carotte', 'légumes', 'Description de la carotte.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (39, 'Panais', 'légumes', 'Description du panais.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (40, 'Poireau', 'légumes', 'Description du poireau.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (41, 'Rutabaga', 'légumes', 'Description du rutabaga.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (42, 'Endive', 'légumes', 'Description de lendive.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (43, 'Épinard', 'légumes', 'Description de lépinard.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (44, 'Navet', 'légumes', 'Description du navet.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (45, 'Laitue', 'légumes', 'Description de la laitue.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (46, 'Asperge', 'légumes', 'Description de lasperge.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (47, 'Radis', 'légumes', 'Description du radis.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (48, 'Cresson', 'légumes', 'Description du cresson.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (49, 'Petit pois', 'légumes', 'Description du petit pois.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (50, 'Fève', 'légumes', 'Description de la fève.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (51, 'Courgette', 'légumes', 'Description de la courgette.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (52, 'Brocoli', 'légumes', 'Description du brocoli.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (53, 'Haricot vert', 'légumes', 'Description de lharicot vert.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (54, 'Concombre', 'légumes', 'Description du concombre.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (55, 'Tomate', 'légumes', 'Description de la tomate.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (56, 'Aubergine', 'légumes', 'Description de laubergine.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (57, 'Poivron', 'légumes', 'Description du poivron.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (58, 'Courge', 'légumes', 'Description de la courge.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (59, 'Maïs', 'légumes', 'Description du maïs.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (60, 'Betterave', 'légumes', 'Description de la betterave.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (61, 'Chou romanesco', 'légumes', 'Description du chou romanesco.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (62, 'Fenouil', 'légumes', 'Description du fenouil.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (63, 'Artichaut', 'légumes', 'Description de lartichaut.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (64, 'Potiron', 'légumes', 'Description du potiron.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (65, 'Chou', 'légumes', 'Description du chou.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (66, 'Pomme de terre', 'légumes', 'Description de la pomme de terre.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (67, 'Topinambour', 'légumes', 'Description du topinambour.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (68, 'Salsifi', 'légumes', 'Description du salsifi.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (69, 'Chou-fleur', 'légumes', 'Description du chou-fleur.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (70, 'Choux de Bruxelles', 'légumes', 'Description des choux de Bruxelles.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (71, 'Céleri-rave', 'légumes', 'Description du céleri-rave.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description) VALUES (72, 'Oignon', 'légumes', 'Description de loignon.')"
      )
    );

    await database.query("delete from products_of_months");
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (1, 'january', 1, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (2, 'january', 2, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (3, 'january', 3, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (4, 'february', 4, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (5, 'february', 5, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (6, 'february', 6, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (7,'march', 7, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (8,'march', 8, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (9,'march', 9, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (10, 'april', 10, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (11, 'april', 11, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (12, 'april', 12, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (13,'may', 13, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (14,'may', 14, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (15,'may', 15, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (16, 'june', 16, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (17, 'june', 17, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (18, 'june', 18, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (19, 'july', 19, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (20, 'july', 20, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (21, 'july', 21, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (22, 'august', 22, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (23, 'august', 23, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (24, 'august', 24, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (25,'september', 25, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (26,'september', 26, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (27,'september', 27, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (28, 'october', 28, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (29, 'october', 29, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (30, 'october', 30, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (31, 'november', 31, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (32, 'november', 32, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (33, 'november', 33, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (34, 'december', 34, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (35, 'december', 35, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (36, 'december', 36, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (37, 'january', 37, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (38, 'january', 38, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (39, 'january', 39, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (40, 'february', 40, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (41, 'february', 41, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (42, 'february', 42, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (43,'march', 43, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (44,'march', 44, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (45,'march', 45, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (46, 'april', 46, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (47, 'april', 47, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (48, 'april', 48, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (49,'may', 49, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (50,'may', 50, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (51,'may', 51, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (52, 'june', 52, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (53, 'june', 53, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (54, 'june', 54, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (55, 'july', 55, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (56, 'july', 56, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (57, 'july', 57, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (58, 'august', 58, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (59, 'august', 59, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (60, 'august', 60, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (61,'september', 61, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (62,'september', 62, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (63,'september', 63, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (64, 'october', 64, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (65, 'october', 65, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (66, 'october', 66, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (67, 'november', 67, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (68, 'november', 68, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (69, 'november', 69, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (70, 'december', 70, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (71, 'december', 71, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_months (product_of_month_id, month, product_id, featured) VALUES (72, 'december', 72, 0)"
      )
    );

    await database.query("delete from users");
    queries.push(
      database.query(
        "INSERT INTO users (user_id, profile, email, password, date_of_birth,address, zip_code, city, profile_picture, confirmation_link,confirmation_date_sent, created_date, last_connection) VALUES (1, 'administrator', 'admin@example.com', 'test', '2024-01-01', '1 rue du pays imaginaire', '33000', 'Bordeaux', NULL, 1, NULL, NOW(), NULL)"
      )
    );

    const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds);
    const hashedPasswordUser = await bcrypt.hash("user", saltRounds);
    queries.push(
      database.query(
        "INSERT INTO users (user_id, profile, email, password, date_of_birth,address, zip_code, city, profile_picture, confirmation_link,confirmation_date_sent, created_date, last_connection) VALUES (2, 'user', 'user@example.com', 'test', '2024-01-01', '2 rue du pays imaginaire', '33000', 'Bordeaux', NULL, 1, NULL, NOW(), NULL)"
      )
    );

    await Promise.all(queries);
    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  } finally {
    database.end();
  }
};

seed();
