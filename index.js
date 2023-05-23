const express = require("express");
require("dotenv").config();
const dbUtils = require("./utils/dbutils");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger_spec");
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
dbUtils.initDB();

const auth_router = require("./routes/auth_routes");
const question_router = require("./routes/question_routes");
const error_controller = require("./controllers/error_controller");
const response_router = require("./routes/response_routes");
const test_router = require("./routes/test_route");

app.use("/test", test_router);
app.use("/user", auth_router);
app.use("/question", question_router);
app.use("/addresponse", response_router);
app.use(error_controller.handleErrors);

process.on("SIGINT", () => {
  console.log("Closing server");
  dbUtils.disconnectDB();
  process.exit();
});

process.on("exit", () => {
  console.log("Server closed");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
