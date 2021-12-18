const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const User = require('./models/User')

dotenv.config();
 
mongoose.connect(
  process.env.MONGO_URL
).then(() => {
    console.log("Noice");
}).catch((err) => {
    console.log(err)
})


app.use(express.json());
app.use("/api/user", userRoute);


app.listen(4000, () => {
  console.log("Server online");
});
    