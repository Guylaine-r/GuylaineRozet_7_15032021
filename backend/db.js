const dbConfig = require('./DBconfig');
const mysql = require('mysql')

// création connexion DDB
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

// connexion MYSQL
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.')
});

module.exports = connection;