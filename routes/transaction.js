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


router.put("/", function(req,res) {
    "use strict";
    var id_user = req.body.id_user;
    var nomor_va_tujuan = req.body.nomor_va_tujuan;
    var id_movie = req.body.id_movie;
    var id_jadwal = req.body.id_jadwal;
    var nomor_seat = req.body.nomor_seat;

    connection.query("insert into transaksi (id_user, nomor_va_tujuan, id_movie, id_jadwal, nomor_seat, time_created, status)" +
        " values (?, ?, ?, ?, ?, now(), 'Pending');",
    [id_user,nomor_va_tujuan,id_movie,id_jadwal,nomor_seat],
    function (error) {
        if (error) {
            console.log(error);
        } else {
            connection.query("select count(*) as num from transaksi;", function (error, rows) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, "Success, new transaction with id  : "+rows[0].num+" created.", res);
                }
            });
        }
    });
});


module.exports = router;
