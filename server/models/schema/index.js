import pg from 'pg';
import {} from 'dotenv/config';
import queries from '../queries';

queries.schema(process.env.DATABASE_DEV_URL, pg);
queries.schema(process.env.DATABASE_TEST_URL, pg);
queries.schema(process.env.DATABASE_PRO_URL, pg);
