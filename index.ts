import express from "express";
import axios from "axios";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users", async (req, res) => {
  const {
    data: { results },
  } = await axios.get("https://randomuser.me/api/");
  res.json(results);
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
