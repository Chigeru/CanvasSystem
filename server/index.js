const express = require("express");
const app = express();
const worktasks = require('./routes/worktasks');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/tasks', worktasks);

app.get("/api", (req,res) => {
  res.send("test if backend works");
})

app.listen(1234, () => console.log(`Server is listening on port 1234`));