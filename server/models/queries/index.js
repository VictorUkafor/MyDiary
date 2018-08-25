function getAUser(req) {
  return req.client.query(
    'SELECT * FROM account WHERE email=($1);',
    [req.body.email.trim()]
  );
}


function getAUserById(req, user) {
  return req.client.query(
    'SELECT * FROM account WHERE user_id=($1)',
    [user.user_id]
  );
}


function getAnEntry(req) {
  return req.client.query(`SELECT * FROM entry WHERE entry_id=($1)
  AND entry_user_id=($2);`, [req.params.entryId, req.user.user_id]);
}


function searchEntriesWithPag(req, page) {
  const search = `%${req.body.search.trim()}%`;
  return req.client.query(
    `SELECT * FROM entry WHERE entry_user_id=($1) AND title LIKE ($2)
    OR content LIKE ($2) ORDER BY entry_id DESC LIMIT 5 OFFSET ($3);`,
    [req.user.user_id, search, (page - 1) * 5]
  );
}


function searchEntries(req) {
  const search = `%${req.body.search.trim()}%`;
  return req.client.query(`SELECT * FROM entry WHERE entry_user_id=($1) AND title LIKE ($2)
    OR content LIKE ($2) ORDER BY entry_id DESC;`, [req.user.user_id, search]);
}


function getAllEntries(req) {
  return req.client.query(
    'SELECT * FROM entry WHERE entry_user_id=($1) ORDER BY entry_id DESC;',
    [req.user.user_id]
  );
}


function getEntriesWithPag(req, page) {
  return req.client.query(
    `SELECT * FROM entry WHERE entry_user_id=($1)
        ORDER BY entry_id DESC LIMIT 5 OFFSET ($2);`,
    [req.user.user_id, (page - 1) * 5]
  );
}


function insertUser(req, salt, bcrypt) {
  let photo = '';
  if (req.files) { photo = req.files.photograph.name; }
  return req.client.query(
    `INSERT INTO account(firstName, lastName, email, password,
    photograph) values($1, $2, $3, $4, $5) RETURNING *`,
    [req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(),
      bcrypt.hashSync(req.body.password.trim(), salt), photo]
  );
}


function insertEntry(req, title, content) {
  return req.client.query(`INSERT INTO entry(entry_user_id, title, content)
  values($1, $2, $3) RETURNING *`, [req.user.user_id, title, content]);
}


function updateEntry(req, title, content, date) {
  return req.client.query(`UPDATE entry SET title=($1), content=($2), updated_at=($3)
  WHERE entry_id=($4) RETURNING *`, [title, content, date, req.entry.entry_id]);
}


function deleteEntry(req) {
  return req.client.query('DELETE FROM entry WHERE entry_id=($1) RETURNING *', [req.entry.entry_id]);
}


const schema = (url, pg) => {
  const connectionString = url;
  const client = new pg.Client(connectionString);
  client.connect(); 

  const queries = `CREATE TABLE IF NOT EXISTS account(
  user_id SERIAL PRIMARY KEY, 
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  photograph VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());

  CREATE TABLE IF NOT EXISTS entry(
  entry_id SERIAL PRIMARY KEY,
  entry_user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content text NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (entry_user_id) REFERENCES account (user_id));
  `;

  client.query(queries, (err) => {
      if (err) {
        return err.message;
      }
      client.end();
    }
    );   
}


const queries = {
  getAllEntries,
  getEntriesWithPag,
  insertUser,
  insertEntry,
  getAUser,
  getAUserById,
  getAnEntry,
  updateEntry,
  deleteEntry,
  searchEntries,
  searchEntriesWithPag,
  schema

};


export default queries;
