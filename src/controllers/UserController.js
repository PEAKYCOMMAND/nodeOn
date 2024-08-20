import postgres from "../database/postgres/pgDB.js";
import { validate as uuidValidate } from "uuid";
import {
  insertUsers,
  showExists,
  updateUsers,
} from "../database/postgres/querys/userQuerys.js";
import { AppError } from "../utils/AppError.js";
import { randomUUID } from "crypto";
import hash from "bcryptjs";

class Usercontroller {
  async create(request, response) {
    const id = randomUUID();
    let { name, email, password } = request.body;
    const passwordHashed = hash.hashSync(password, 8);

    const existsEmail = await postgres(showExists("email", email));
    if (existsEmail[0]?.email) {
      throw new AppError("This email is already being used");
    }

    postgres(insertUsers(id, name, email, passwordHashed));
    response.status(201).json("success");
  }

  async update(request, response) {
    const findInDb = (colunm, value) => postgres(showExists(colunm, value));
    const { id } = request.params;
    let { name, email, new_email, password, new_password } = request.body;

    const isUUID = uuidValidate(id);

    if (!isUUID) {
      throw new AppError("This user id not exists ");
    }

    const findUserId = await findInDb("id", id);

    if (!findUserId[0]?.id) {
      throw new AppError("This user not exists");
    }
    //Email check
    const userWithUpdatedEmail = await findInDb("email", new_email);

    if (userWithUpdatedEmail[0]?.email) {
      throw new AppError("This email is already in use.");
    }
    //Associate email with id received
    const oldEmailExists = await findInDb("email", email);

    if (oldEmailExists[0]?.id !== findUserId[0]?.id) {
      throw new AppError("you don't going this operation");
    }

    const passwordHashed = await findInDb("email", email);
    const passwordCheck = await hash.compare(
      password,
      passwordHashed[0]?.password
    );

    if (!passwordCheck) {
      throw new AppError("Verify your password and try again");
    }

    const isChangeEmail =
      email && new_email ? new_email : email ?? findUserId[0].email;
    const isChangePswd = password && new_password ? new_password : password;
    name = name ?? findUserId[0].name;

    await postgres(
      updateUsers(id, name, isChangeEmail, hash.hashSync(isChangePswd, 8))
    );
    response.header(200).json("success");
  }
}
export { Usercontroller };
