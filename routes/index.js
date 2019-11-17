var express = require("express");
var router = new express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    "use strict";
    res.send("Express App Home, Last Update :)");
});

module.exports = router;
