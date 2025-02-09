import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors("http"));

app.use(helmet()); // this helps with security by setting various HTTP headers
app.use(morgan("dev")); // log the requests

app.get("/test", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
