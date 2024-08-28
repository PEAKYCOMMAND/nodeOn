import { validate as uuidValidate } from "uuid";
import { AppError } from "../utils/AppError.js";
import postgres from "../database/postgres/pgDB.js";
import { showExists } from "../database/postgres/querys/tagsQuerys.js";

class tagsController {
  async index(request, response) {
    const { user_id } = request.params;
    const isUUID = uuidValidate(user_id);

    if (!isUUID) {
      throw new AppError("This user id is not valid");
    }

    const userIsValid = await postgres(showExists("tags", "user_id", user_id));

    if (!userIsValid) {
      throw new AppError("This user id not exists");
    }

    const tags = await postgres(showExists("tags", "user_id", user_id));

    response.status(200).json(tags);
  }
}

export default tagsController;
