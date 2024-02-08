import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db as database } from "./connection.js";
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
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (1, 'Poire', 'fruits', 'Description de la poire.','/products/poire.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (2, 'Clémentine', 'fruits', 'Description de la clémentine.','/products/clementine.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (3, 'Banane', 'fruits', 'Description de la banane.','/products/banane.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (4, 'Pomme', 'fruits', 'Description de la pomme.','/products/pomme.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (5, 'Kiwi', 'fruits', 'Description du kiwi.','/products/kiwi.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (6, 'Raisin', 'fruits', 'Description du raisin.','/products/raisin.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (7, 'Citron', 'fruits', 'Description du citron.','/products/citron.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (8, 'Nectarine', 'fruits', 'Description de la nectarine.','/products/nectarine.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (9, 'Groseille', 'fruits', 'Description de la groseille.','/products/groseille.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (10, 'Pomme', 'fruits', 'Description de la pomme.','/products/pomme.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (11, 'Abricot', 'fruits', 'Description de labricot.','/products/abricot.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (12, 'Pastèque', 'fruits', 'Description de la pastèque.','/products/pastheque.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (13, 'Fraise', 'fruits', 'Description de la fraise.','/products/fraise.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (14, 'Cerise', 'fruits', 'Description de la cerise.','/products/cerise.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (15, 'Rhubarbe', 'fruits', 'Description de la rhubarbe.','/products/rhubarbe.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (16, 'Melon', 'fruits', 'Description du melon.','/products/melon.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (17, 'Cassis', 'fruits', 'Description du cassis.','/products/cassis.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (18, 'Grenade', 'fruits', 'Description de la grenade.','/products/grenade.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (19, 'Ananas', 'fruits', 'Description de lananas.','/products/ananas.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (20, 'Mirabelle', 'fruits', 'Description de la mirabelle.','/products/mirabelle.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (21, 'Myrtille', 'fruits', 'Description de la myrtille.','/products/myrtille.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (22, 'Pamplemousse', 'fruits', 'Description du pamplemousse.','/products/pamplemousse.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (23, 'Prune', 'fruits', 'Description de la prune.','/products/prune.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (24, 'Mûre', 'fruits', 'Description de la mûre.','/products/mure.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (25, 'Figue', 'fruits', 'Description de la figue.','/products/figue.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (26, 'Physalis', 'fruits', 'Description du physalis.','/products/physalis.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (27, 'Pruneau', 'fruits', 'Description du pruneau.','/products/pruneau.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (28, 'Kaki', 'fruits', 'Description du kaki.','/products/kaki.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (29, 'Noisette', 'fruits', 'Description de la noisette.','/products/noisette.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (30, 'Framboise', 'fruits', 'Description de la framboise.','/products/framboise.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (31, 'Mangue', 'fruits', 'Description de la mangue.','/products/mangue.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (32, 'Fruit de la passion', 'fruits', 'Description du fruit de la passion.','/products/grenadille.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (33, 'Anone', 'fruits', 'Description de lanone.','/products/anone.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (34, 'Coing', 'fruits', 'Description du coing.','/products/coing.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (35, 'Orange', 'fruits', 'Description de lorange.','/products/orange.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (36, 'Mandarine', 'fruits', 'Description de la mandarine.','/products/mandarine.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (37, 'Chou frisé', 'vegetables', 'Description du chou frisé.','/products/choufrise.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (38, 'Carotte', 'vegetables', 'Description de la carotte.','/products/carotte.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (39, 'Panais', 'vegetables', 'Description du panais.','/products/panais.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (40, 'Poireau', 'vegetables', 'Description du poireau.','/products/poireau.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (41, 'Rutabaga', 'vegetables', 'Description du rutabaga.','/products/rutabaga.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (42, 'Endive', 'vegetables', 'Description de lendive.','/products/endive.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (43, 'Épinard', 'vegetables', 'Description de lépinard.','/products/epinard.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (44, 'Navet', 'vegetables', 'Description du navet.','/products/navet.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (45, 'Laitue', 'vegetables', 'Description de la laitue.','/products/laitue.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (46, 'Asperge', 'vegetables', 'Description de lasperge.','/products/asperge.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (47, 'Radis', 'vegetables', 'Description du radis.','/products/radis.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (48, 'Cresson', 'vegetables', 'Description du cresson.','/products/cresson.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (49, 'Petit pois', 'vegetables', 'Description du petit pois.','/products/petitpois.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (50, 'Fève', 'vegetables', 'Description de la fève.','/products/feve.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (51, 'Courgette', 'vegetables', 'Description de la courgette.','/products/courgette.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (52, 'Brocoli', 'vegetables', 'Description du brocoli.','/products/brocoli.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (53, 'Haricot vert', 'vegetables', 'Description de lharicot vert.','/products/haricotvert.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (54, 'Concombre', 'vegetables', 'Description du concombre.','/products/concombre.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (55, 'Tomate', 'vegetables', 'Description de la tomate.','/products/tomate.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (56, 'Aubergine', 'vegetables', 'Description de laubergine.','/products/aubergine.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (57, 'Poivron', 'vegetables', 'Description du poivron.','/products/poivron.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (58, 'Courge', 'vegetables', 'Description de la courge.','/products/courge.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (59, 'Maïs', 'vegetables', 'Description du maïs.')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (60, 'Betterave', 'vegetables', 'Description de la betterave.','/products/betterave.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (61, 'Chou romanesco', 'vegetables', 'Description du chou romanesco.','/products/romanesco.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (62, 'Fenouil', 'vegetables', 'Description du fenouil.','/products/fenouil.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (63, 'Artichaut', 'vegetables', 'Description de lartichaut.','/products/artichaut.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (64, 'Potiron', 'vegetables', 'Description du potiron.','/products/potiron.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (65, 'Chou', 'vegetables', 'Description du chou.','/products/chou.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (66, 'Pomme de terre', 'vegetables', 'Description de la pomme de terre.','/products/pdt.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (67, 'Topinambour', 'vegetables', 'Description du topinambour.','/products/topinambour.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (68, 'Salsifi', 'vegetables', 'Description du salsifi.','/products/salsifi.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (69, 'Chou-fleur', 'vegetables', 'Description du chou-fleur.','/products/choufleur.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (70, 'Choux de Bruxelles', 'vegetables', 'Description des choux de Bruxelles.','/products/bruxelles.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (71, 'Céleri-rave', 'vegetables', 'Description du céleri-rave.','/products/rave.webp')"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products (product_id, name, category, description, picture) VALUES (72, 'Oignon', 'vegetables', 'Description de loignon.','/products/oignon.webp')"
      )
    );

    await database.query("delete from products_of_month");
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (1, 'january', 1, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (2, 'january', 2, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (3, 'january', 3, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (4, 'february', 4, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (5, 'february', 5, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (6, 'february', 6, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (7,'march', 7, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (8,'march', 8, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (9,'march', 9, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (10, 'april', 10, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (11, 'april', 11, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (12, 'april', 12, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (13,'may', 13, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (14,'may', 14, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (15,'may', 15, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (16, 'june', 16, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (17, 'june', 17, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (18, 'june', 18, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (19, 'july', 19, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (20, 'july', 20, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (21, 'july', 21, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (22, 'august', 22, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (23, 'august', 23, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (24, 'august', 24, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (25,'september', 25, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (26,'september', 26, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (27,'september', 27, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (28, 'october', 28, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (29, 'october', 29, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (30, 'october', 30, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (31, 'november', 31, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (32, 'november', 32, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (33, 'november', 33, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (34, 'december', 34, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (35, 'december', 35, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (36, 'december', 36, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (37, 'january', 37, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (38, 'january', 38, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (39, 'january', 39, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (40, 'february', 40, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (41, 'february', 41, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (42, 'february', 42, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (43,'march', 43, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (44,'march', 44, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (45,'march', 45, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (46, 'april', 46, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (47, 'april', 47, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (48, 'april', 48, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (49,'may', 49, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (50,'may', 50, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (51,'may', 51, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (52, 'june', 52, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (53, 'june', 53, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (54, 'june', 54, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (55, 'july', 55, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (56, 'july', 56, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (57, 'july', 57, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (58, 'august', 58, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (59, 'august', 59, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (60, 'august', 60, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (61,'september', 61, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (62,'september', 62, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (63,'september', 63, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (64, 'october', 64, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (65, 'october', 65, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (66, 'october', 66, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (67, 'november', 67, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (68, 'november', 68, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (69, 'november', 69, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (70, 'december', 70, 1)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (71, 'december', 71, 0)"
      )
    );
    queries.push(
      database.query(
        "INSERT INTO products_of_month (product_of_month_id, month, product_id, featured) VALUES (72, 'december', 72, 0)"
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
