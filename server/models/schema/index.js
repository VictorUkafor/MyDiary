import pg from 'pg';
import {} from 'dotenv/config';
import { schema } from '../queries';

schema(process.env.DATABASE_DEV_URL, pg);
// schema(process.env.DATABASE_TEST_URL, pg);
// schema(process.env.DATABASE_PRO_URL, pg);
