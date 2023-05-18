const express = require("express");

require("dotenv").config();
const dbUtils = require("./utils/dbutils");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

dbUtils.initDB();
// app.use(cors());

const error_controller = require("./controllers/error_controller");

const question_router = require("./routes/question_routes");

const auth_router = require("./routes/auth_routes");

const test_router = require("./routes/test_route");

app.use("/test", test_router);

app.use("/user", auth_router);

app.use("/api", question_router);

app.use(error_controller.handleErrors);


app.use("/question", questionRouter);

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
