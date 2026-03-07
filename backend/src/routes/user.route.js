const express = require("express");
const userController = require("../controllers/user.controller");
const { identifyUser } = require("../middlewares/auth.middleware");

// export async function followUser(userId) {
//   const response = await api.post(`/api/users/follow/${userId}`);
//   return response.data;
// }
// export async function unFollowUser(userId) {
//   const response = await api.post(`/api/users/unfollow/${userId}`);
//   return response.data;
// }
// export async function getUserProfile(userId) {
//   const response = await api.get(`/api/users/profile/${userId}`);
//   return response.data;
// }
// export async function getUserFollowers(userId) {
//   const response = await api.get(`/api/users/followers/${userId}`);
//   return response.data;
// }
// export async function getUserFollowing(userId) {
//   const response = await api.get(`/api/users/following/${userId}`);
//   return response.data;
// }
// export async function usertofollow(userId) {
//   const response = await api.get(`/api/users/tofollow/${userId}`);
//   return response.data;
// }




const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userId
 * @desc follow a user
 * @access private
 */
userRouter.post(
  "/follow/:userId",
  identifyUser,
  userController.followUserController,
);
userRouter.post(
  "/unfollow/:userId",
  identifyUser,
  userController.unfollowUserController,
);
/**
 * @route GET /api/users/profile/:userId
 * @desc get user profile
 * @access private
 */ 
userRouter.get(
  "/profile/:userId",
  identifyUser,
  userController.getUserProfileController
);

/**
 * @route GET /api/users/followers/:userId     {working}  /followers/699dad6787bb932e829ed77a
 * @desc get user followers
 * @access private
 */
userRouter.get(
  "/followers/:userId",
  identifyUser,
  userController.getUserFollowersController
);
/**
 * @route GET /api/users/following/:userId   {working}
 * @desc get user following
 * @access private
 */
userRouter.get(      
  "/following/:userId",
  identifyUser,
  userController.getUserFollowingController
);

/**
 * @route GET /api/users/tofollow/:userId  {working}
 * @desc get user to follow
 * @access private
 * this route will return a list of users that the user is not following and also not the user himself
 */
userRouter.get(
  "/tofollow/:userId",
  identifyUser,
  userController.getUserToFollowController
);

module.exports = userRouter;
