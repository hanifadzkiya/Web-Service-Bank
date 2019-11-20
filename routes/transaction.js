var express = require("express");
var router = express.Router();

"use strict";

var response = require("../util/response");
var connection = require("../util/dbconnection");

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
        connection.query("SELECT * from transaksi WHERE id_user = " + id_user, 
            function (error, rows){
                if(error){
                    console.log(error);
                } else {
                    response.ok(rows,"Success Get Transaction with id_user = " + id_user,res);
                }
            });
    } else {
        res.send("Give parameter");
    }
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
