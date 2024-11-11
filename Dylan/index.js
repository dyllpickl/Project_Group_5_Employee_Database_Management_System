import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
let loginEmail, loginPassword;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "finaldb",
    password: "dylang",  // *** Input your own password here
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('loginPage.ejs', { errorMessage: "" });
});

app.get('/loginPage', (req, res) => {
    res.render('loginPage.ejs');
});

app.get('/editProfile', (req, res) => {
    res.render('editProfile.ejs');
});

// Checks for the profile type of login information
// Displays the related profiles
app.get('/profileView', async (req, res) => {
    let dbProfiles;

    // Obtains all profile_type from profiles table
    const dbProfilesResult = await db.query("SELECT * FROM public.profiles WHERE email=($1)",
        [loginEmail]
    );
    const dbProfileType = dbProfilesResult.rows[0].profile_type;

    // If the type is of admin, obtain all profiles
    // Otherwise, obtain only the user's profile
    if (dbProfileType === "AD") {
        dbProfiles = await db.query("SELECT * FROM public.profiles");
    } else {
        dbProfiles = await db.query("SELECT * FROM public.profiles WHERE email=($1)",
            [loginEmail]
        );
    }
    res.render('profileView.ejs', { profiles: dbProfiles.rows })
});

// Loads the profile editing page with corresponding profile
app.get('/editProfile/:profileId', async (req, res) => {
    const profileId = req.params.profileId;
    const userResult = await db.query("SELECT * FROM public.users WHERE email=($1)",
        [loginEmail]
    );
    const profileResult = await db.query("SELECT * FROM public.profiles WHERE email=($1)",
        [loginEmail]
    );
    const userRecord = userResult.rows[0];
    const user = {
        username: userRecord.username,
        password: userRecord.password,
        email: userRecord.email,
    }
    const profileRecord = profileResult.rows[0];
    const profile = {
        firstName: profileRecord.first_name,
        lastName: profileRecord.last_name,
        profileType: profileRecord.profile_type,
        ssn: profileRecord.ssn,
        phoneNumber: profileRecord.phone_number,
    }
    res.render('editProfile.ejs', { user, profile, profileId })
});

// Updates the related profile based on editProfile values
app.post('/editProfile/:profileId', async (req, res) => {
    const profileId = req.params.profileId;
    const { username, password, email, firstName, lastName, profileType, ssn, phoneNumber } = req.body;

    await db.query("UPDATE users SET username=($1), password=($2) WHERE email=($3)",
        [username, password, email]
    );
    await db.query("UPDATE profiles SET first_name=($1), last_name=($2), ssn=($3), phone_number=($4), profile_type=($5) WHERE profile_id=($6)",
        [firstName, lastName, ssn, phoneNumber, profileType, profileId]
    );
    res.redirect('/profileView');
});

// Gets POST request from loginPage to authenticate the input fields from login page
// If authentication passes, then call request to profileView
app.post('/loginPage', async (req, res) => {
    // Obtains email and password from input fields
    loginEmail = req.body.email;
    loginPassword = req.body.password;

    // Obtains email and password from users table
    const dbUserResult = await db.query("SELECT * FROM public.users WHERE email=($1)",
        [loginEmail]
    );
    const dbUserEmail = dbUserResult.rows[0].email;
    const dbUserPassword = dbUserResult.rows[0].password;

    // Authenticates that user input exists within user table
    // If email and password match, display information
    if (loginEmail.trim() === dbUserEmail) {
        if (loginPassword.trim() == dbUserPassword) {
            res.redirect('/profileView');
        } else {
            // Render login page, send message to create alert in loginPage
            res.render('loginPage.ejs', { errorMessage: "Incorrect email address or password.  Please try again." });
        }
    } else {
        // Render login page, send message to create alert in loginPage
        res.render('loginPage.ejs', { errorMessage: "Incorrect email address or password.  Please try again." });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
