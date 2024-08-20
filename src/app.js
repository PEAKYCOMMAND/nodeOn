import "express-async-errors";
import { migrationsRun } from "./database/postgres/migrations/index.js";
import { AppError } from "./utils/AppError.js";
import express from "express";
import { routes } from "./routes/index.js";
import cors from "cors";
import { usersRoutes } from "./routes/user.routes.js";

const app = express();
app.use(express.json());
// app.use(cors());

//Define o cors() somente para a rota usuários
usersRoutes.use(cors());
app.use(routes);

//Migrations
migrationsRun();

// Identificando erros
app.use((error, request, response, next) => {
  //Dá erro do Cliente quando eu lanço um erro no controller
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }

  //Se não for erro no cliente é no servidor.
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

// SGBD
