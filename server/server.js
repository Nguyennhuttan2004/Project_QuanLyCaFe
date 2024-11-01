const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route.js")
const adminProductsRouter = require('./routes/admin/products-routes.js');
const shopProductsRouter = require("./routes/shop/products-route.js");

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
app.use("/api/auth", authRouter)
app.use('/api/admin/products',adminProductsRouter)
app.use("/api/shop/products", shopProductsRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
