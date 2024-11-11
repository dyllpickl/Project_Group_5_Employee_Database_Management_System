// Has been added to index.js

// Gets POST request from loginPage to authenicate the input fields from login page
// If authentication passes, then display the related profiles
app.post('/loginPage', async (req, res) => {
    // Obtains email and password from input fields
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    // Obtains email and password from users table
    const dbUserResult = await db.query("SELECT * FROM public.users WHERE email=($1)",
        [loginEmail]
    );
    const dbUserEmail = dbUserResult.rows[0].email;
    const dbUserPassword = dbUserResult.rows[0].password;
    let dbProfiles;

    // Authenticates that user input exists within user table
    // If email and password matches, display information
    if (loginEmail.trim() === dbUserEmail) {
        if (loginPassword.trim() == dbUserPassword) {
            // Obtains all profile_type from profiles table
            const dbProfilesResult = await db.query("SELECT * FROM public.profiles WHERE email=($1)",
                [dbUserEmail]
            );
            const dbProfileType = dbProfilesResult.rows[0].profile_type;

            // If type is of admin, obtain all profiles
            // Otherwise, obtain only the user's profile
            if (dbProfileType === "AD") {
                dbProfiles = await db.query("SELECT * FROM public.profiles");
            } else {
                dbProfiles = await db.query("SELECT * FROM public.profiles WHERE email=($1)",
                    [dbUserEmail]
                );
            }
            res.render('profileView.ejs', { profiles: dbProfiles.rows })
        } else {
            // Render login page, send message to create alert in loginPage
            res.render('loginPage.ejs', { errorMessage: "Incorrect email address or password.  Please try again." });
        }
    } else {
        // Render login page, send message to create alert in loginPage
        res.render('loginPage.ejs', { errorMessage: "Incorrect email address or password.  Please try again." });
    }
});
