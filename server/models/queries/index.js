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


const queries = {
  getAllEntries,
  getEntriesWithPag,
  insertUser,
  insertEntry,
  getAUser,
  getAUserById,
  getAnEntry,
  updateEntry,
  deleteEntry

};


export default queries;
