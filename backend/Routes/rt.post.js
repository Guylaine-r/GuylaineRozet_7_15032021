const ctrlPost = require('../Controllers/ctrl.post');
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/posts/:id", ctrlPost.getPost);
router.get("/posts/:id/comments", ctrlPost.getPostComments);
router.get("/posts", ctrlPost.getAllPosts);
router.post("/posts", auth.userCheck, ctrlPost.createPost);
router.delete("/posts/:id", auth.userCheck, auth.moderatorCheck, ctrlPost.deletePost)
router.delete("/comments/:id", auth.userCheck, auth.moderatorCheck, ctrlPost.deleteComment);
router.post("/posts/:id/comments", auth.userCheck, ctrlPost.addComment);

module.exports = router;