const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const User = require('./models/User')

dotenv.config();
 
mongoose.connect(
  process.env.MONGO_URL
).then(() => {
    console.log("Successfully connected to database");
}).catch((err) => {
    console.log(err)
})


app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


app.listen(4000, () => {
  console.log("Successfully connected to server");
});
    