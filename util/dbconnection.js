var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wstransaksi"
});

con.connect(function (err) {
    "use strict";
    if (err) {
        throw err;
    }
});

module.exports = con;