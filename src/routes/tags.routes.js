import { Router } from "express";
import tagsController from "../controllers/TagsController.js";

const tagsRoutes = Router();
const tags = new tagsController();

tagsRoutes.get("/:user_id", tags.index);

export default tagsRoutes;
