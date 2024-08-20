import postgres from "../database/postgres/pgDB.js";
import { validate as uuidValidate } from "uuid";

import { randomUUID } from "crypto";
import {
  insertNotes,
  insertLinks,
  insertTags,
  showExists,
} from "../database/postgres/querys/noteQuerys.js";
import { AppError } from "../utils/AppError.js";

class NotesController {
  async create(request, response) {
    const { user_id } = request.params;
    const { title, description, links, tags } = request.body;
    const note_id = randomUUID();

    const isUUID = uuidValidate(user_id);
    if (!isUUID) {
      throw new AppError("This note id not exists ");
    }

    await postgres(insertNotes(note_id, title, description, user_id));
    // Insert in table links
    links.map(async (url) => {
      const link_id = randomUUID();
      await postgres(insertLinks(link_id, note_id, url));
    });
    // Insert in table tags
    tags.map(async (tag) => {
      const tag_id = randomUUID();
      await postgres(insertTags(tag_id, tag, note_id, user_id));
    });

    response.status(200).json("success");
  }

  async index(request, response) {
    const { note_id } = request.params;
    const isUUID = uuidValidate(note_id);

    if (!isUUID) {
      throw new AppError("This note id not exists ");
    }

    const note = await postgres(showExists("notes", "id", note_id));

    if (!note[0]?.id) {
      throw new AppError("This note id not exists ");
    }

    const tags = await postgres(showExists("tags", "note_id", note_id));
    const links = await postgres(showExists("links", "note_id", note_id));
    response.status(200).json({ note, tags, links });
  }
}

export default NotesController;
