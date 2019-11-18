var mysql = require("mysql");

var con = mysql.createConnection({
    host: "database-1.cxqar33fjxpj.ap-southeast-1.rds.amazonaws.com",
    user: "engimabp",
    password: "Bankpro234",
    database: "wstransaksi"
});

con.connect(function (err) {
    "use strict";
    if (err) {
        throw err;
    }
});

module.exports = con;
