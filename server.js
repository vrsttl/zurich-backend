require("dotenv").config();

const express = require("express");
const axios = require("axios").default;
const flow = require("./public/flow.json");

const app = express();
const PORT = process.env.PORT;
const PUT_API = process.env.PUT_API

app.use(express.json());
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
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

app.post("/putData", async (req, res) => {
  try {
    const response = await axios.put(PUT_API, req.body);
    console.log("response", [response.status, response.statusText]);
    res.sendStatus(response.status);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
