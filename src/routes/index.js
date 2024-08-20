import { Router } from "express";
//rotas
import { usersRoutes } from "./user.routes.js";
import { notesRoutes } from "./note.routes.js";

const routes = Router();

routes.use("/api/v1/users", usersRoutes);
routes.use("/api/v1/notes", notesRoutes);

export { routes };
