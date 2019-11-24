var express = require("express");
var router = express.Router();

"use strict";

var response = require("../util/response");
var connection = require("../util/dbconnection");

/*
    Update all transactin status
 */

function updateAllTransactionStatus(){
    // Cek seluruh tabel
    connection.query("UPDATE transaksi SET status = 'Cancelled' WHERE (TIME_TO_SEC(TIMEDIFF(NOW(), time_created)) > 120) AND status = 'Pending';",
        function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log("OK");
            }
        });
}

/*
Router to get transaction details 
*/
router.get("/", function(req, res) {
    if(req.query.id){
        let id = req.query.id;
        connection.query("SELECT * from transaksi WHERE id = " + id, 
            function (error, rows){
                if(error){
                    console.log(error);
                } else {
                    response.ok(rows,"Success Get Transaction with id = " + id,res);
                }
            });
    } else if(req.query.id_user){
        let id_user = req.query.id_user;
        connection.query("SELECT * from transaksi WHERE id_user = " + id_user + " ORDER BY time_created DESC", 
            function (error, rows){
                if(error){
                    console.log(error);
                } else {
                    response.ok(rows,"Success Get Transaction with id_user = " + id_user,res);
                }
            });
    } else if(req.query.id_movie && req.query.id_jadwal){
        let id_movie = req.query.id_movie;
        let id_jadwal = req.query.id_jadwal;
        // YEAR(Date) = 2011 AND MONTH(Date) = 5;
        let sql = "SELECT * from transaksi WHERE id_movie = " + id_movie + " AND id_jadwal = '" + id_jadwal + "' AND status != 'Cancelled' ORDER BY nomor_seat ASC";
        connection.query(sql, 
            function (error, rows){
                if(error){
                    console.log(error);
                } else {
                    response.ok(rows,"Success Get Transaction with id_movie = " + id_movie,res);
                }
            });
    } else {
        res.send(req.query);
    }

    updateAllTransactionStatus();
});


router.post("/", function(req,res) {
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
            connection.query("SELECT id FROM transaksi ORDER BY id DESC LIMIT 1;", function (error, rows) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, "Success, new transaction with id  : "+rows[0].id+" created.", res);
                }
            });
        }
    });

    updateAllTransactionStatus();
});

router.put("/", function (req, res) {
    "use strict";
    var id = req.body.id;
    var status = req.body.status;

    if(status == 'Success'){
        connection.query("UPDATE transaksi SET status = '" + status + "' WHERE id = "+ id + " AND status = 'Pending'",
        function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, "Success! Transaction status with id " + id + " changed to " + status, res);
            }
        });
    } else {
        connection.query("UPDATE transaksi SET status = '" + status + "' WHERE id = ?",
            [id],
            function (error, rows) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, "Success! Transaction status with id " + id + " changed to " + status, res);
                }
            });
    }
    updateAllTransactionStatus();
});


module.exports = router;
