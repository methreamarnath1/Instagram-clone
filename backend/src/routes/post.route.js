const express = require("express");
const postRouter = express.Router();
const { identifyUser } = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route POST /api/posts/
 * @desc create a new post
 * @request  req.body  = {caption, imageUrl, userId}
 * @access protected
 */
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/**
 * @route GET /api/posts/
 * @desc get all posts
 * @access protected
 */
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * @route get /api/posts/details/:postId
 * @desc get a post by id [ retiurn an detail about  a specific post with the id . aslo check wethre the post belong to the user that the request come from  if the user is not the owner of the post return an error message  that you are not authorized to view this post details]
 * @access protected
 */
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/**
 * @route POST /api/posts/like/:postId
 * @desc like a post
 * @access protected
 */
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

/**
 * @route POST /api/posts/unlike/:postId
 * @desc unlike a post
 * @access protected
 */
postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unLikePostController,
);
/**
 * @route GET /api/post/feed
 * @description get all the post created in the db
 * @access PRIVATE
 */
postRouter.get("/feed", identifyUser, postController.getFeedController);
module.exports = postRouter;
