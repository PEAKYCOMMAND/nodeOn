import { users, notes, tags, links } from "./migrations.js";
import postgres from "../pgDB.js";
async function migrationsRun() {
  const schemas = [users, notes, links, tags];
  for (let migration of schemas) {
    await postgres(migration);
  }
}

export { migrationsRun };
