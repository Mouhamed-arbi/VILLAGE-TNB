const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: '51.38.227.167',
//   user: 'villagetnb',
//   password: 'pwvsZApR6Dtwzv',
//   database: 'villagetnb',
//   port: 2031
// });
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'villagetnb',
  port: 3307
});

connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err.code);
    console.error('Error message:', err.message);
  } else {
    console.log('Connected as id');
  }
});

module.exports = connection;