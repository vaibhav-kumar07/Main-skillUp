const express = require("express");
require("dotenv").config();
const dbUtils = require("./utils/dbutils");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
dbUtils.initDB();
const questionRouter = require("./routes/question_routes");
app.use("/question", questionRouter);
app.get("/", (req, res) => {
  res.status(200).send("hello world,I hope all are healthy & wealthy");
});
process.on("SIGINT", () => {
  dbUtils.disconnectDB();
  console.log("Closing server");
  process.exit();
});

process.on("exit", () => {
  console.log("Server closed");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
