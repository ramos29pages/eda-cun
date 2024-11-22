const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'autorack.proxy.rlwy.net',
  database: 'railway',
  password: 'fJYtDcpFrhucarxXsIOYPjIkCQrrxstR',
  port: 32269,
});

module.exports = pool;