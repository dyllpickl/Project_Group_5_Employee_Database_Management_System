/* Made some modfications to /getProfiles POST route and getProfiles function to
handle the new constant of sortedDisplay for ordering the profileView

I did not know how to retrieve sortedDisplay from SortProfiles.  I was thinking of
passing {sortedDisplay} alongside {email} within the FETCH request in profileView.js,
but was unsure as to how */

app.post("/getProfiles", async (req, res) => {
  const email = req.body.email;
  const sortedDisplay = req.body.sortedDisplay; // Created new sortedDisplay constant for sorting profiles
  const result = await getProfiles(email, sortedDisplay); // Inserted new paramater to sort the query
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

async function getProfiles(email, sortedDisplay) {
  // Added new parameter sortedDisplay
  var queryStr;
  if (await isAdmin(email)) {
    /* If email is Admin, determine the query based on sortedDisplay
    if ascending or descending, order accordingly, if no button is pressed
    or left default, return normal query */
    if (sortedDisplay === "ascending") {
      queryStr = "SELECT * FROM profiles ORDER BY first_name ASC"; // Order SELECT statement based on first_name (A-Z)
    } else if (sortedDisplay === "descending") {
      queryStr = "SELECT * FROM profiles ORDER BY first_name DESC"; // Order SELECT statement based on first_name (Z-A)
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
