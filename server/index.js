import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import pg from "pg";

configDotenv();

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});

process.on("SIGINT", () => {
  db.end();
  console.log("Server closing down & ending DB connection.");
  process.exit();
});
