import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const schema = path.join(__dirname, "database", "schema.sql");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const migrate = async () => {
  try {
    const sql = fs.readFileSync(schema, "utf8");

    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    await database.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    await database.query(`CREATE DATABASE ${DB_NAME}`);
    await database.query(`USE ${DB_NAME}`);
    await database.query(sql);

    database.end();

    console.info(`Database ${DB_NAME} updated from ${schema} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

migrate();
