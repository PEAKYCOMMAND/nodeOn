import pg from "pg";
import "dotenv/config";
const { Client } = pg;

const connectionString = process.env.CONNECTION;

async function postgres(query) {
  const client = new Client({ connectionString });
  await client.connect();
  const { text, params } = query;

  const res = () => {
    if (params) return client.query(text, params);

    return client.query(query);
  };
  const queryResult = await res();
  await client.end();
  return queryResult.rows;
}

export default postgres;
