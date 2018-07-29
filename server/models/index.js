import pg from 'pg';
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:success4me@localhost:5432/mydiary_dev';

const client = new pg.Client(connectionString);
client.connect();

const user = client.query(`CREATE TABLE IF NOT EXISTS diaryUser(id SERIAL PRIMARY KEY,
  firstName VARCHAR(20) not null,
  lastName VARCHAR(20) not null, 
  email VARCHAR(40) not null, 
  password VARCHAR(255) not null)`);

user.on('end', () => { client.end(); });


const entry = client.query(`CREATE TABLE IF NOT EXISTS entry(id SERIAL PRIMARY KEY, 
  diaryUserId integer not null, 
  title VARCHAR(50) not null, 
  content text not null, 
  foreign key (diaryUserId) REFERENCES diaryUser (id))`);

entry.on('end', () => { client.end(); });
