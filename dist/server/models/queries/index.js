'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAUser = function getAUser(req) {
  return req.client.query('SELECT * FROM account WHERE email=($1);', [req.body.email.trim()]);
};

var getAUserById = function getAUserById(req, user) {
  return req.client.query('SELECT * FROM account WHERE user_id=($1)', [user.user_id]);
};

var getAnEntry = function getAnEntry(req) {
  return req.client.query('SELECT * FROM entry WHERE entry_id=($1)\n  AND entry_user_id=($2);', [req.params.entryId, req.user.user_id]);
};

var searchEntriesWithPag = function searchEntriesWithPag(req, page) {
  var search = '%' + String(req.body.search.trim()) + '%';
  return req.client.query('SELECT * FROM entry WHERE entry_user_id=($1) AND title LIKE ($2)\n    OR content LIKE ($2) ORDER BY entry_id DESC LIMIT 5 OFFSET ($3);', [req.user.user_id, search, (page - 1) * 5]);
};

var searchEntries = function searchEntries(req) {
  var search = '%' + String(req.body.search.trim()) + '%';
  return req.client.query('SELECT * FROM entry WHERE entry_user_id=($1) AND title LIKE ($2)\n    OR content LIKE ($2) ORDER BY entry_id DESC;', [req.user.user_id, search]);
};

var getAllEntries = function getAllEntries(req) {
  return req.client.query('SELECT * FROM entry WHERE entry_user_id=($1) ORDER BY entry_id DESC;', [req.user.user_id]);
};

var getEntriesWithPag = function getEntriesWithPag(req, page) {
  return req.client.query('SELECT * FROM entry WHERE entry_user_id=($1)\n        ORDER BY entry_id DESC LIMIT 5 OFFSET ($2);', [req.user.user_id, (page - 1) * 5]);
};

var insertUser = function insertUser(req, salt, bcrypt) {
  var photo = '';
  if (req.files) {
    photo = req.files.photograph.name;
  }
  return req.client.query('INSERT INTO account(firstName, lastName, email, password,\n    photograph) values($1, $2, $3, $4, $5) RETURNING *', [req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(), bcrypt.hashSync(req.body.password.trim(), salt), photo]);
};

var insertEntry = function insertEntry(req, title, content) {
  return req.client.query('INSERT INTO entry(entry_user_id, title, content)\n  values($1, $2, $3) RETURNING *', [req.user.user_id, title, content]);
};

var updateEntry = function updateEntry(req, title, content, date) {
  return req.client.query('UPDATE entry SET title=($1), content=($2), updated_at=($3)\n  WHERE entry_id=($4) RETURNING *', [title, content, date, req.entry.entry_id]);
};

var deleteEntry = function deleteEntry(req) {
  return req.client.query('DELETE FROM entry WHERE entry_id=($1) RETURNING *', [req.entry.entry_id]);
};

var schema = function schema(url, pg) {
  var connectionString = url;
  var client = new pg.Client(connectionString);
  client.connect();

  var queries = 'CREATE TABLE IF NOT EXISTS account(\n  user_id SERIAL PRIMARY KEY, \n  firstName VARCHAR(255) NOT NULL,\n  lastName VARCHAR(255) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  password VARCHAR(255) NOT NULL,\n  photograph VARCHAR(255),\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());\n\n  CREATE TABLE IF NOT EXISTS entry(\n  entry_id SERIAL PRIMARY KEY,\n  entry_user_id INTEGER NOT NULL,\n  title VARCHAR(255) NOT NULL,\n  content text NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  FOREIGN KEY (entry_user_id) REFERENCES account (user_id));\n  ';

  client.query(queries, function (err) {
    if (err) {
      return err.message;
    }
    client.end();
  });
};

var beforeQueriesForEntries = function beforeQueriesForEntries(client, password) {
  var queries = '\n  DROP TABLE IF EXISTS account CASCADE;\n  \n  DROP TABLE IF EXISTS entry CASCADE;\n  \n  CREATE TABLE IF NOT EXISTS account (\n    user_id SERIAL PRIMARY KEY, \n    firstName VARCHAR(255) NOT NULL,\n    lastName VARCHAR(255) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    password VARCHAR(255) NOT NULL,\n    photograph VARCHAR(255),\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() );\n    \n    CREATE TABLE IF NOT EXISTS entry (\n      entry_id SERIAL PRIMARY KEY,\n      entry_user_id INTEGER NOT NULL,\n      title VARCHAR(255) NOT NULL,\n      content text NOT NULL,\n      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n      FOREIGN KEY (entry_user_id) REFERENCES account (user_id) );\n      \n      INSERT INTO account (firstName, lastName, email,\n      password) values(\'Kenny\', \'Andrew\', \'kenandrew@gmail.com\', \'' + String(password) + '\' );\n      \n      INSERT INTO entry (entry_user_id, title, content) values \n      (\'1\', \'It all started when\', \'It all started when I was still  . . .\' );';

  client.query(queries, function (err) {
    if (err) {
      return err.message;
    }
    client.end();
  });
};

var beforeQueryForUser = function beforeQueryForUser(client) {
  var query = 'TRUNCATE TABLE account CASCADE';
  client.query(query, function (err) {
    if (err) {
      return err.message;
    }
    client.end();
  });
};

var queries = {
  getAllEntries: getAllEntries,
  getEntriesWithPag: getEntriesWithPag,
  insertUser: insertUser,
  insertEntry: insertEntry,
  getAUser: getAUser,
  getAUserById: getAUserById,
  getAnEntry: getAnEntry,
  updateEntry: updateEntry,
  deleteEntry: deleteEntry,
  searchEntries: searchEntries,
  searchEntriesWithPag: searchEntriesWithPag,
  schema: schema,
  beforeQueriesForEntries: beforeQueriesForEntries,
  beforeQueryForUser: beforeQueryForUser
};

exports['default'] = queries;
//# sourceMappingURL=index.js.map