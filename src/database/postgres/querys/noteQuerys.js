function insertNotes(id, title, description, user_id) {
  let text = `INSERT INTO notes (id, title, description, user_id ) VALUES ($1, $2, $3, $4)`;
  return { text, params: [id, title, description, user_id] };
}

function insertLinks(id, note_id, url) {
  let text = `INSERT INTO links (id, note_id, url) VALUES ($1, $2, $3)`;
  return { text, params: [id, note_id, url] };
}

function insertTags(id, name, note_id, user_id) {
  let text = `INSERT INTO tags (id, name, note_id, user_id ) VALUES ($1, $2, $3, $4)`;
  return { text, params: [id, name, note_id, user_id] };
}

function showExists(table, colunm, parameter) {
  const text = `SELECT * FROM ${table} WHERE ${colunm}=$1`;

  return { text, params: [parameter] };
}

function deleteNote(table, id) {
  const text = `DELETE FROM ${table} WHERE id=$1`;
  return { text, params: [id] };
}

function querySearch(table, user_id, like, orderBy) {
  const text = `SELECT * FROM ${table} WHERE user_id=$1 AND LOWER(title) LIKE '%${like}%' OR LOWER(description) LIKE '%${like}%' ORDER BY ${orderBy}`;
  return { text, params: [user_id] };
}

function searchWhereIn(table, vector) {
  const vectorFilter = [];
  const filter = (value, indice) => vectorFilter.push(`$${indice + 1}`);
  vector.forEach(filter);
  const params = `(${vectorFilter.toString()})`;

  const text = `SELECT * FROM (${table}  INNER JOIN notes ON ${table}.note_id = notes.id) WHERE name IN ${params}  `;

  return { text, params: [...vector] };
}

export {
  insertNotes,
  insertLinks,
  insertTags,
  showExists,
  querySearch,
  searchWhereIn,
  deleteNote,
};
