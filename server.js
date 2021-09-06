require("dotenv").config();

const express = require("express");
const flow = require("./public/flow.json");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://127.0.0.1:3000",
    "https://localhost:3000",
  ];
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/getFlow", (req, res) => {
  res.json({ result: flow });
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
