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

function updateNotes(id, name, email, password) {
  const text = `UPDATE notes SET
      name=$2,
      updated_at= NOW(),
      email=$3,
      password=$4
      WHERE id=$1`;
  return { text, params: [id, name, email, password] };
}

export { insertNotes, insertLinks, insertTags, showExists, updateNotes };
