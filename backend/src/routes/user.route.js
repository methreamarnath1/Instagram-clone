const express = require("express");
const userController = require("../controllers/user.controller");
const { identifyUser } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userId
 * @desc follow a user
 * @access private
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);
userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
);

module.exports = userRouter;
