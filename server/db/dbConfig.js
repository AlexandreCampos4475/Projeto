const mysql = require('mysql');

const db = mysql.createConnection({
	multipleStatements: true, // Permite mais de uma consulta por linha.
	host: "localhost",
	user: "root",
	password: "Ca@44751882",
	database: "proteto_tcc"
});

module.exports = db;