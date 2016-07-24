var express = require('express');
var router = express.Router();

var postController = require("../controllers/post-controller.js");

router.get("/", listingController.getAll);
router.get("/create/", listingController.create);

module.exports = router;
