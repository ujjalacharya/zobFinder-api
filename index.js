import express from "express";
import { dbURI } from "./config/keys";
import routes from './routes';

//Third party dependencies
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import Joi from "joi";

require("express-async-errors");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();
const PORT = process.env.PORT || 3000;

//Connection to the database
mongoose
  .set("useCreateIndex", true)
  .connect(
    dbURI,
    { useNewUrlParser: true }
  )
  .then(() => {
    //Starts the server
    app.listen(PORT, () => {
      console.log(`App started at PORT ${PORT} and established connection to the database`);
    });
  })
  .catch(err => console.log("Error: Could not connect to the database"));

//body parser for the params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import routes
app.use("/api", routes);

//Error handling middleware
app.use(function(err, req, res, next) {
  res.status(500).send("Something failed...");
});
