const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbUtils = require("./utils/dbutils");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
dbUtils.initDB();
const error_controller = require("./controllers/error_controller");
const auth_router = require("./routes/auth_routes");
const solver_router = require("./routes/solver_routes");

app.use("/user", auth_router);
app.use("/solvers", solver_router);
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
