const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12614141',
  password: 'vYJyEPFEFN',
  database: 'sql12614141',
});


module.exports = connection;