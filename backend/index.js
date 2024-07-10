const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const stadiumRoute = require("./router/stadiumRouter");
const stadiumOwner = require("./router/stadiumOwnerRouter");
const authRouter = require("./router/authRouter");
dotenv.config();

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongoDB");

        await mongoose.connection.db.collection('stadiums').createIndex({ stadium_name: "text", address: "text", phone: "text" });
        console.log("Text index created for stadium collection");
    } catch (error) {
        console.log("Error connecting to MongoDB");
    }
    
};
connectDB();

app.use("/api", stadiumRoute);
app.use("/api", stadiumOwner);
//Router Regiter/login
app.use("/api", authRouter);


app.listen(3000, () => {
    console.log("server is running http://localhost:3000/");
});

// Authentication
// Authorization