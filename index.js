const express = require("express");
require("dotenv").config();
const dbUtils = require("./utils/dbutils");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
dbUtils.initDB();

const error_controller = require("./controllers/error_controller");
const question_router = require("./routes/question_routes");
const auth_router = require("./routes/auth_routes");
const response_router = require("./routes/response_routes");
const test_router = require("./routes/test_route");

app.use("/test", test_router);
app.use("/user", auth_router);
app.use("/question", question_router);
app.use("/addresponse", response_router);
app.use(error_controller.handleErrors);

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
