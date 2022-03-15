const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (test, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
const { Pool: pg_Pool } = require('pg');
require('dotenv').config();

// create a new pool here using the connection string above
const newPool = new pg_Pool({
  connectionString: process.env.PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return newPool.query(text, params, callback);
  },
};
