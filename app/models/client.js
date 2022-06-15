const { Client } = require('pg');
require('dotenv').config();

//const client = new Client(process.env.PG_URL);

const client = new Client({
   connectionString: process.env.DATABASE_URL,
   ssl: {
     rejectUnauthorized: false
   }
 });

client.connect();

module.exports = client;