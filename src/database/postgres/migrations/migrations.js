const users = `
CREATE TABLE IF NOT EXISTS users (
    id UUID UNIQUE,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const notes = `CREATE TABLE IF NOT EXISTS notes (
    id UUID UNIQUE,
    title VARCHAR,
    description VARCHAR,
    user_id UUID REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

const tags = `CREATE TABLE IF NOT EXISTS tags (
id UUID UNIQUE,
name VARCHAR NOT NULL,
note_id UUID REFERENCES notes (id) ON DELETE CASCADE,
user_id UUID REFERENCES users (id)
)
`;

const links = `CREATE TABLE IF NOT EXISTS links (
id UUID UNIQUE,
note_id UUID REFERENCES notes (id) ON DELETE CASCADE,
url VARCHAR,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
export { users, notes, links, tags };
