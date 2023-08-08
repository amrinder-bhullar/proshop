import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMidddleware.js";
import cookieParser from "cookie-parser";

connectDB(); //Connect to MongoDB

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes); // send the requests to /api/products to productRoutes
app.use("/api/users", userRoutes); // send the requests to /api/users to userRoutes
app.use("/api/orders", orderRoutes); // send the requests to /api/orders to orderRoutes.js
app.use("/api/upload", uploadRoutes); // handles the file uploads for product image

// we cannot store paypal Client it in frontend code so when we need it we can call this api endpoint which will return the client ID
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // set __dirname to current directory

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// this is how you implement error handling middleware it intercepts when res has an error and checks the error and changes the status code and message.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("http://localhost:5000");
});
