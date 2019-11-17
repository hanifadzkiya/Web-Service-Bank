exports.ok = function (values, message, res) {
    "use strict";
    var data = {
        "status": 200,
        "values": values,
        "message": message
    };
    res.json(data);
    res.end();
};