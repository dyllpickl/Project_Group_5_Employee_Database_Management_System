import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "finaldb",
  password: "Mac2479",
  port: 5432,
});

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await signin(username, password);
    if (result == "Invalid") {
      res.json({ responce: "Invalid" });
    } else {
      console.log(result);
      res.json({ responce: result });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/getProfiles", async (req, res) => {
  const email = req.body.email;
  const sortedDisplay = req.body.sortedDisplay || NaN; 
  const result = await getProfiles(email, sortedDisplay); 
  res.json({ responce: result });
});

app.post("/add", async (req, res) => {
  if (
    await addProfile(
      req.body.first_name,
      req.body.last_name,
      req.body.ssn,
      req.body.email,
      req.body.phone_number,
      req.body.profile_type
    )
  ) {
    res.json({ code: "working" });
  } else {
    res.json({ code: "error" });
  }
});

app.put("/update", async (req, res) => {
  console.log(req.body)
  if (
    await editProfile(
      req.body.first_name,
      req.body.last_name,
      req.body.ssn,
      req.body.email,
      req.body.phone_number,
      req.body.id
    )
  ) {
    res.json({ code: "working" });
  } else {
    res.json({ code: "error" });
  }
});

app.delete("/deleteProfile", async (req, res) => {
  if (await deleteProfile(req.body.id)) {
    res.json({ code: "working" });
  } else {
    res.json({ code: "error" });
  }
});

process.on("SIGINT", () => {
  db.end();
  console.log("Server closing down & ending DB connection.");
  process.exit();
});

async function signin(username, password) {
  try {
    const result = await db.query(
      "SELECT email FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rowCount > 0) {
      return result.rows[0].email;
    } else {
      return "Invalid";
    }
  } catch (err) {
    console.log("ERROR: could not sign in.");
    return false;
  }
}

async function getProfiles(email, sortedDisplay) {
  var queryStr;
  if (await isAdmin(email)) {
    if (sortedDisplay === "ascending") {
      queryStr = "SELECT * FROM profiles ORDER BY first_name ASC";
    } else if (sortedDisplay === "descending") {
      queryStr = "SELECT * FROM profiles ORDER BY first_name DESC";
    } else {
      queryStr = "SELECT * FROM profiles";
    }
  } else {
    queryStr = `SELECT * FROM profiles WHERE email = ${email}`;
  }
  try {
    const result = await db.query(queryStr);
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return [];
    }
  } catch (err) {
    console.log("ERROR: could not sign in.");
    return false;
  }
}

async function isAdmin(email) {
  try {
    const result = await db.query(
      "SELECT profile_type FROM profiles WHERE email = $1",
      [email]
    );
    if (result.rowCount > 0) {
      return result.rows[0].profile_type === "AD" ? true : false;
    } else {
      return False;
    }
  } catch (err) {
    console.log("ERROR: could not sign in.");
    return false;
  }
}

async function addProfile(first, last, ssn, email, number, type) {
  try {
    const result = await db.query(
      "INSERT INTO profiles (first_name, last_name, ssn, email, phone_number, profile_type) VALUES ($1, $2, $3, $4, $5, $6)",
      [first, last, ssn, email, number, type]
    );
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: data couldn't be added.");
  }
}

async function editProfile(first, last, ssn, email, number, id) {
  try {
    const result = await db.query(
      "UPDATE profiles SET first_name = $1, last_name = $2, ssn = $3, email = $4, phone_number = $5 WHERE profile_id = $6",
      [first, last, parseInt(ssn), email, number, parseInt(id)]
    );
    console.log(result)
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: data couldn't be added.");
  }
}

async function deleteProfile(id) {
  try {
    const result = await db.query(
      "DELETE FROM profiles WHERE profile_id = $1",
      [parseInt(id)]
    );
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: data couldn't be added.");
  }
}
