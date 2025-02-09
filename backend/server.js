import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors("http"));
app.use(helmet()); // this helps with security by setting various HTTP headers
app.use(morgan("dev")); // log the requests

app.use("/api/products", productRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
