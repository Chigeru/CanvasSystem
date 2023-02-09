import express from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import general from "./routes/general.js";
import inserts from "./routes/CRUD/Inserts.js";
import updateData from "./routes/CRUD/updateData.js";
import deleteData from "./routes/CRUD/deleteData.js"

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
app.use("/api", general);
app.use("/api/posts", inserts);
app.use("/api/update", updateData);
app.use("/api/delete", deleteData);

app.get("/api", (req, res) => {
  res.send("test if backend works");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile("./public/favicon.png");
});

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.STATUS} mode, listening on port ${PORT}`
  )
);
