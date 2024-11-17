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

app.get('/', (req, res) => {
  res.render("homePage.js");
});

app.get("/login", (req, res) => {
  res.render("loginPage.js");
});

//Adding this temporarily
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
      try{
          const result = await db.query("SELECT * FROM users WHERE username = ($2)", [username,]);
          if (result.rows.length > 0) {
              const user = result.rows[0];
              const storedPassword = user.password;

              if (password === storedPassword) {
                  res.render("homePage.js");
              } else {
                  res.send("Incorrect Password");  
              }
          } else {
              res.send("User not found");
          }
      } catch(err) {
          console.log(err);
      }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});

process.on("SIGINT", () => {
  db.end();
  console.log("Server closing down & ending DB connection.");
  process.exit();
});
