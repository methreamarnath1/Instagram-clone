const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username; // Get the username of the currently authenticated user (the follower)
  const followeeId = req.params.userId; // Get the userId to be followed from the request parameters

  // Find the followee by ID to get their username
  const followee = await userModel.findOne({ _id: followeeId }).select("username");

  if (!followee) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const followeeUsername = followee.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "you cannot follow yourself",
    });
  }

  const isAllreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isAllreadyFollowing) {
    return res.status(200).json({
      message: "you are already following this user",
      follow: isAllreadyFollowing,
    });
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
  const followeeId = req.params.userId;
  
  // Find the followee by ID to get their username
  const followee = await userModel.findOne({ _id: followeeId }).select("username");

  if (!followee) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const followeeUsername = followee.username;
  
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

async function getUserProfileController(req, res) {
  const userId = req.params.userId;

  // Validate userId is provided and is a valid MongoDB ObjectId format
  if (!userId || userId === "undefined") {
    return res.status(400).json({
      message: "Invalid or missing user ID",
    });
  }

  const user = await userModel
    .findOne({ _id: userId })
    .select("-password -email -__v");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User profile retrieved successfully",
    user,
  });
}

async function getUserFollowersController(req, res) {
  const userId = req.params.userId;
  
  // Validate userId is provided and is a valid MongoDB ObjectId format
  if (!userId || userId === "undefined") {
    return res.status(400).json({
      message: "Invalid or missing user ID",
    });
  }
  
  const user = await userModel.findOne({ _id: userId }).select("username");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  
  // Get follower usernames
  const followRecords = await followModel
    .find({ followee: user.username })
    .select("follower -_id");
  
  // Get full user details for each follower
  const followerUsernames = followRecords.map(f => f.follower);
  const followers = await userModel
    .find({ username: { $in: followerUsernames } })
    .select("_id username profileImage");
  
  res.status(200).json({
    message: "User followers retrieved successfully",
    followers,
  });
}

async function getUserFollowingController(req, res) {
  const userId = req.params.userId;
  
  // Validate userId is provided and is a valid MongoDB ObjectId format
  if (!userId || userId === "undefined") {
    return res.status(400).json({
      message: "Invalid or missing user ID",
    });
  }
  
  const user = await userModel.findOne({ _id: userId }).select("username");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  
  // Get following usernames
  const followRecords = await followModel
    .find({ follower: user.username })
    .select("followee -_id");
  
  // Get full user details for each followee
  const followingUsernames = followRecords.map(f => f.followee);
  const following = await userModel
    .find({ username: { $in: followingUsernames } })
    .select("_id username profileImage");
  
  res.status(200).json({
    message: "User following retrieved successfully",
    following,
  });
}

async function getUserToFollowController(req, res) {
  const userId = req.params.userId;
  
  // Validate userId is provided and is a valid MongoDB ObjectId format
  if (!userId || userId === "undefined") {
    return res.status(400).json({
      message: "Invalid or missing user ID",
    });
  }
  
  const user = await userModel.findOne({ _id: userId }).select("username");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  
  const following = await followModel
    .find({ follower: user.username })
    .select("followee -_id");
  
  const toFollow = await userModel
    .find({
      username: { $nin: [...following.map((f) => f.followee), user.username] },
      _id: { $ne: user._id },
    })
    .select("_id username profileImage");
  
  res.status(200).json({
    message: "Users to follow retrieved successfully",
    toFollow,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  getUserProfileController,
  getUserFollowersController,
  getUserFollowingController,
  getUserToFollowController,
};