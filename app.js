const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const ownerRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/userRouter")
const indexRouter = require("./routes/index")
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
    resave: false,
    saveUninitialized: false, // if the user is not login then no need to create the session.
    secret: 'wsdlkfelfdcd',
    // secret: process.env.JWT_KEY,
})
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);  // All the request related to products send to productsRouter.

app.listen(3000);