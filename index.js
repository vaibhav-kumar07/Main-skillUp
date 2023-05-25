const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const dbUtils = require("./utils/dbutils");

const PORT = process.env.PORT || 3000;
app.use(express.json());
dbUtils.initDB();

const error_controller = require("./controllers/error_controller");

const quesRoute = require("./routes/question_routes");

const auth_router = require("./routes/auth_routes");

const test_router = require("./routes/test_route");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("welcome to the skill UP project here working successfully ");
});

app.use("/api", test_router);

app.use("/user", auth_router);

app.use("/api", quesRoute);

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
