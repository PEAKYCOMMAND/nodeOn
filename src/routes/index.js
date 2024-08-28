import { Router } from "express";

import { usersRoutes } from "./user.routes.js";
import { notesRoutes } from "./note.routes.js";
import tagsRoutes from "./tags.routes.js";

const routes = Router();

routes.use("/api/v1/users", usersRoutes);
routes.use("/api/v1/notes", notesRoutes);
routes.use("/api/v1/tags", tagsRoutes);
export { routes };
