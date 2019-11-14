var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1256",
    database: "wstransaksi"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;