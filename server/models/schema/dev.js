import pg from 'pg';
import {} from 'dotenv/config';

const connectionString = process.env.DATABASE_DEV_URL;
const client = new pg.Client(connectionString);

client.connect();

const user = client.query(`CREATE TABLE IF NOT EXISTS account(
    user_id SERIAL PRIMARY KEY, 
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);

user.on('end', () => { client.end(); });


const entry = client.query(`CREATE TABLE IF NOT EXISTS entry(
    entry_id SERIAL PRIMARY KEY,
    entry_user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content text NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (entry_user_id) REFERENCES account (user_id))`);

entry.on('end', () => { client.end(); });
