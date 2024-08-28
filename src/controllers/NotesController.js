import postgres from "../database/postgres/pgDB.js";
import { validate as uuidValidate } from "uuid";

import { randomUUID } from "crypto";
import {
  insertNotes,
  insertLinks,
  insertTags,
  showExists,
  deleteNote,
  querySearch,
  searchWhereIn,
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

  async show(request, response) {
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

  async delete(request, response) {
    const { note_id } = request.params;
    const isUUID = uuidValidate(note_id);

    if (!isUUID) {
      throw new AppError("This note id not exists ");
    }

    const note = await postgres(showExists("notes", "id", note_id));
    if (!note[0]?.id) {
      throw new AppError("This note not exists ");
    }
    await postgres(deleteNote("notes", note_id));

    response.status(200).json("success");
  }

  async index(request, response) {
    const { user_id, search, tags, order } = request.query;
    const isUUID = uuidValidate(user_id);
    const searchLower = search?.toLowerCase();
    const searchQuery = searchLower?.replace(/[^a-z A-Z0-9]/g, "");
    if (!isUUID) {
      throw new AppError("This note id not exists ");
    }

    const userExists = await postgres(showExists("users", "id", user_id));

    if (!user_id) {
      throw new AppError("This note id not exists ");
    }

    if (!userExists[0]?.id) {
      throw new AppError("This note id not exists ");
    }

    if (tags) {
      const filterTags = tags.split("+").map((tag) => tag.trim());
      const tagSearch = await postgres(searchWhereIn("tags", filterTags));

      const yourNotes = tagSearch.filter((tag) => tag.user_id === user_id);

      const tagsFilter = yourNotes.map((tag) => ({
        name: tag.name,
        note_id: tag.note_id,
        user_id: tag.user_id,
      }));

      const notesFilter = yourNotes.map((note) => ({
        user_id: note.user_id,
        title: note.title,
        description: note.description,
      }));

      // Fazer uma solução que remove repetidos de um vetor
      // fazer uma função drop() e uma push() pegando o vector.length  diminuindo 1
      //  e comparando, se for igual ao primeiro drop(), se for diferente, push()
      // ...
      return response
        .status(200)
        .json({ notes: notesFilter, tags: tagsFilter });
    }

    const orderBy =
      order === "title" || order === "notes" || order === "description"
        ? order
        : "created_at";

    const notes = search
      ? await postgres(querySearch("notes", note_id, searchQuery, orderBy))
      : await postgres(showExists("notes", "id", note_id));

    return response.status(200).json(notes);
  }
}

export default NotesController;
