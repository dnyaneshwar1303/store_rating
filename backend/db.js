import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = await mysql.createPool({
    host:process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database
});

try {
  const connection = await db.getConnection();
  console.log("MySQL connected");
  connection.release();
} catch (err) {
  console.log("MySQL connection failed:", err.message);
}