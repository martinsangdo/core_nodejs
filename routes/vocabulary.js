var express = require("express");
var router = express.Router();
const Common = require("../common/common");
const common = new Common();
const Vocabulary = require("../models/Vocabulary");

const request = require('request');

const {
    load_next
} = require("../controller/vocabulary");
//
router.get("/load_next", function (req, res, next) {
    Vocabulary.findOne({is_read: {$ne: false}}, '', (err, doc) => {
        if (err || !doc) {
            return res.rest.success(
                "Cannot find the item"
            );
        }
        return res.rest.success(doc);
    });
});

//======
module.exports = router;
