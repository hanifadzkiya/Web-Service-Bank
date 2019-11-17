var express = require("express");
var router = new express.Router();
var response = require("../util/response");
var connection = require("../util/dbconnection");

/* GET transaction listing. */
router.post("/", function (req, res) {
    "use strict";
    var id = req.body.id;
    var transactionStatus = "Success";

    connection.query("UPDATE transaksi SET status = '" + transactionStatus + "' WHERE id = ?",
        [id],
        function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, "Success! Transaction status with id " + id + " changed to " + transactionStatus, res);
            }
        });
});

module.exports = router;