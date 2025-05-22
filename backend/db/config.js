const mysql = require('mysql2/promise');

 const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sqlsql05',
  database: 'blog_api',
});

module.exports = pool;
