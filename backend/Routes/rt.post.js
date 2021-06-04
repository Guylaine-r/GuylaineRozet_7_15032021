const ctrlPost = require('../Controllers/ctrl.post');
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/addPost", multer, ctrlPost.createPost);

module.exports = router;