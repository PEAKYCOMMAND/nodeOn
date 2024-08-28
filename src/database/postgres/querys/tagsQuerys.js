function showExists(table, colunm, parameter) {
  const text = `SELECT * FROM ${table} WHERE ${colunm}=$1`;

  return { text, params: [parameter] };
}

export { showExists };
