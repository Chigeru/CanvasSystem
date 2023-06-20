import express from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


import crudRoutes from "./routes/CRUDRoutes.js";
import formRoutes from "./routes/CRUDFormsRoute.js";
// import sessionChecker from "./helper/SessionChecker.js";

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

// const sessionMaxAge = 1*24*60*60*1000; // milliseconds to desired time -> days * hours * minutes * seconds * milliseconds
// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   session({
//     name: `daffyduck`,
//     secret: "some-secret-example",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // This will only work if you have https enabled!
//       maxAge: sessionMaxAge, 
//     },
//   })
// );

/* Routes */
app.use("/api", crudRoutes);


// app.get('/', sessionChecker, async function(req, res, next) {
//   res.redirect('/loggedin')
// });
// app.get('/loggedin', (req, res) => {
//   res.send("this is loggedin page")
// })


app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.STATUS} mode, listening on port ${PORT}`
  )
);
