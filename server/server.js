const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const path = require('path');

const avatarRouter = require('./routes/auth/avatar-route.js');
const authRouter = require("./routes/auth/auth-route.js")
const adminProductsRouter = require('./routes/admin/products-routes.js');
const adminOrderRouter = require("./routes/admin/order-routes.js"); 

const shopProductsRouter = require("./routes/shop/products-route.js");
const shopCartRouter = require("./routes/shop/cart-routes.js");
const shopAddressRouter = require("./routes/shop/address-routes.js");
const shopOrderRouter = require("./routes/shop/order-routes.js");
const shopSearchRouter = require("./routes/shop/search-routes.js");
const shopReviewRouter = require("./routes/shop/review-routes.js");

const commonFeatureRouter = require("./routes/common/feature-routes.js");

mongoose
  .connect(
    "mongodb+srv://nhuttan288204:nhuttan288204@cluster0.5tgg4.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((erorr) => console.log(erorr));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("."))

app.use('/api', avatarRouter)

app.use("/api/auth", authRouter)
// app.use('/api/auth', avatarRouter); 

app.use('/api/admin/products',adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
