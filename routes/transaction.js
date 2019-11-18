var express = require('express');
var router = express.Router();

'use strict';

var response = require('../util/response');
var connection = require('../util/dbconnection');

/*
Router to get transaction details given by transaction id
*/
router.get('/', function(req, res) {
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
    }
});

module.exports = router;
