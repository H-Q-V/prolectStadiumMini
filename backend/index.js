const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const stadiumRoute = require("./router/stadiumRouter");
const connection = require("./config/mongoodb");
dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// async function connectDB(){
//     try{
//         await mongoose.connect(process.env.MONGODB_URL);
//         console.log("connected to mongoDB");
//     } catch (error) {
//         console.log("Error connecting to MongoDB");
//     }

// };

app.use("/api", stadiumRoute);

// connectDB();
connection();
app.listen(8000, () => {
  console.log("server is running http://localhost:8000/");
});
