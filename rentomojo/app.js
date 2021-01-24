require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const userRoutes=require("./routes/user");

//DB Connection
mongoose
  .connect(process.env.DATA, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = process.env.PORT || 3000;


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api", userRoutes);


// LISTENING PORT
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
