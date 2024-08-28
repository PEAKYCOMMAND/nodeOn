import "express-async-errors";
import { migrationsRun } from "./database/postgres/migrations/index.js";
import { AppError } from "./utils/AppError.js";
import express from "express";
import { routes } from "./routes/index.js";
import cors from "cors";
import { usersRoutes } from "./routes/user.routes.js";

const app = express();
app.use(express.json());

usersRoutes.use(cors());
app.use(routes);

//Migrations
migrationsRun();

app.use((error, request, response, next) => {
  //client side
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }

  //server side
  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
const PORT = 3000;
app.listen(`${PORT}`, () => {
  console.log(`Server is running on port:${PORT}`);
});

