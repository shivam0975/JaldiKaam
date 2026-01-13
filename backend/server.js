const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config();



const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// DATABASE CONFIGURATION 

const db = require('./models');
const Role = db.role ;

db.mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database Connected Successfully");
  initial();
}).catch((err) => {
  console.log("Connection Error : ", err.message);
  process.exit();
})

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      const roles = ["customer", "provider", "admin"];

      await Promise.all(
        roles.map(name =>
          new Role({ name }).save().then(() => {
            console.log(`added '${name}' to roles collection`);
          })
        )
      );
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
}


// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "jaldikaam-ka-session",
    keys: ["95de9e7ae5041dc489355e6642e3ad07748e0f11669f9aa3226cc6b0c602c4e0"],
    httpOnly: true
  })
);

app.get("/" , (req , res) => {
  res.json({message : "Welcome TO BACKEND API SERVER PAGE."});
})


// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}.`);
});


// const crypto = require('crypto');

// function generateCookieSecret(length = 32) {
//   // Generate random bytes
//   const buffer = crypto.randomBytes(length);
//   // Convert to a hexadecimal string for easier use
//   return buffer.toString('hex');
// }

// const secret = generateCookieSecret();
// console.log(secret);