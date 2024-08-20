import { Router } from "express";
import { Usercontroller } from "../controllers/UserController.js";
import cors from "cors";
import { AppError } from "../utils/AppError.js";
const usersRoutes = Router();

function myMiddleware(request, response, next) {
  const { name, email, password } = request.body;

  if (name || email || password) {
    next();
  } else {
    throw new AppError("Name, email and password fields are mandatory");
  }
}

const usercontroller = new Usercontroller();

usersRoutes.post("/", cors(), myMiddleware, usercontroller.create);
usersRoutes.get("/", (request, response) => {
  response.status(200).json();
});
usersRoutes.put("/:id", cors(), myMiddleware, usercontroller.update);
export { usersRoutes };
