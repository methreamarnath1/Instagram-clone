const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if(followerUsername === followeeUsername) {
    return res.status(400).json({
      message:"you cannot follow yourself"
    })
  }

  // Find the followee by username to get their ObjectId
  const followee = await userModel.findOne({ username: followeeUsername });

  if (!followee) {
    return res.status(404).json({
      message: "User not found",
    });
  }

 const isAllreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if(isAllreadyFollowing) {
    return res.status(200).json({
      message:"you are already following this user",
      follow:isAllreadyFollowing
    })
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: "user followed successfully",
    followRecord,
  });
}
async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `you are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  res.status(200).json({
    message: `you unfollowed ${followeeUsername} successfully`,
  });
} 

module.exports = {
  followUserController,
  unfollowUserController,
};
