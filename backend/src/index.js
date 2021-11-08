import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import api from "./routes/api.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { PORT } = process.env;
app.use("/api", api);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err });
});

app.listen(PORT, () => {
  console.info(`Server listening on localhost:${PORT}`);
});
