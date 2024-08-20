function insertUsers(id, name, email, password) {
  const text = `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)`;
  return { text, params: [id, name, email, password] };
}

function showExists(colunm, parameter) {
  const text = `SELECT * FROM users WHERE ${colunm}=$1`;

  return { text, params: [parameter] };
}

function updateUsers(id, name, email, password) {
  const text = `UPDATE users SET
  name=$2,
  updated_at= NOW(),
  email=$3,
  password=$4
  WHERE id=$1`;
  return { text, params: [id, name, email, password] };
}

export { insertUsers, showExists, updateUsers };
