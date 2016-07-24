var express = require('express');
//var multer = require('multer');
//var upload = multer({dest: 'uploads/'})

var router = express.Router();

var listingController = require("../controllers/listing-controller.js");

router.get("/", listingController.getAll);
router.post("/create", listingController.create);
router.post("/add", listingController.addPost);
router.post("/upvote", listingController.upvotePost);

module.exports = router;
