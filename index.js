const express = require("express");
const { dbURI } = require("./config/keys");
const app = express();
const PORT = process.env.PORT || 3000;

//Third party dependencies
require("express-async-errors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

//Connection to the database
mongoose
  .set("useCreateIndex", true)
  .connect(
    dbURI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connection established...')
  })
  .catch(err => console.log("Error: Could not connect to the database"));

//body parser for the params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
require('./config/passport').isAdmin(passport);
require('./config/passport').isLogin(passport);
require('./config/passport').isEmployerLogin(passport);

//Import routes
app.use("/api", require("./routes"));

//404 error
app.get("*", (req, res)=>{
  res.status(404).json("Could not find the page!")
})

// Error handling middleware
app.use(function(err, req, res, next) {
  res.status(500).send("Something failed...");
});

//Starts the server
app.listen(PORT, () => {
  console.log(
    `App started at PORT ${PORT}`
  );
});