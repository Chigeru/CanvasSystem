import express from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import crudRoutes from "./routes/CRUDRoutes.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.DEV_PORT || 8080;

mongoose.set("strictQuery", false);
mongoose
  .connect(`${process.env.MONGO_URI}${process.env.DB_TEST}`)
  .catch((error) => console.log(`${error}. did not connect`));

/* Routes */
app.use("/api", crudRoutes);

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.STATUS} mode, listening on port ${PORT}`
  )
);
