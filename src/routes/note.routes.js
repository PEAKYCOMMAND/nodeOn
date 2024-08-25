import { Router } from "express";
import NotesController from "../controllers/NotesController.js";
const notesRoutes = Router();

const notes = new NotesController();
notesRoutes.post("/:user_id", notes.create);
notesRoutes.get("/:note_id", notes.show);
notesRoutes.delete("/:note_id", notes.delete);
notesRoutes.get("/", notes.index);
export { notesRoutes };
