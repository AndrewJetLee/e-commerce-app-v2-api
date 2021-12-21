const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();
 
mongoose.connect(
  process.env.MONGO_URL
).then(() => {
    console.log("Successfully connected to database");
}).catch((err) => {
    console.log(err)
})

// middleware
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


app.listen(4000, () => {
  console.log("Successfully connected to server");
});
    