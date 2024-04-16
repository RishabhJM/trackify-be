const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();
const auth = require("./routes/auth");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());

// app.get('/hello',(req,res)=>{
//   console.log("HELLO WORLD");
//   res.send("YAY");
// })
// //routes
// app.use("/api/v1", auth);
// app.use("/api/v1", auth);
// app.use("/api/v1", require("./routes/auth.js"));
readdirSync("./routes").map((route) => {
    app.use("/api/v1", require("./routes/" + route));
}
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
