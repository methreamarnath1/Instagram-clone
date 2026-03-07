import React, { useEffect, useState } from "react";
import "../style/follow.scss";
import { usePost } from "../hook/usePost";
import { useAuth } from "../../auth/hooks/useAuth";

const Follow = () => {
  const { user } = useAuth();
  const {
    handleFollowUser,
    handleUnFollowUser,
    handleGetUserProfile,
    handleGetUserFollowers,
    handleGetUserFollowing,
    handleGetUserToFollow,
  } = usePost();

  const [userProfile, setUserProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("=== Follow Component Mount ===");
    console.log("User object:", user);
    console.log("User ID:", user?._id);

    // TEMPORARY: Hard-code your user ID for testing
    const testUserId = "69a12409eecdc84cb5b6b943"; // Replace with your actual user ID
    const userId = user?._id || testUserId;

    console.log("Using User ID:", userId);

    if (!userId) {
      console.log("❌ No user ID found, stopping fetch");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("🔄 Starting data fetch for user:", userId);

        console.log("Calling handleGetUserProfile...");
        const profile = await handleGetUserProfile(userId);
        console.log("✅ Profile received:", profile);

        console.log("Calling handleGetUserFollowers...");
        const followersList = await handleGetUserFollowers(userId);
        console.log("✅ Followers received:", followersList);

        console.log("Calling handleGetUserFollowing...");
        const followingList = await handleGetUserFollowing(userId);
        console.log("✅ Following received:", followingList);

        console.log("Calling handleGetUserToFollow...");
        const suggested = await handleGetUserToFollow(userId);
        console.log("✅ Suggested received:", suggested);

        setUserProfile(profile);
        setFollowers(followersList || []);
        setFollowing(followingList || []);
        setSuggestedUsers(suggested || []);

        console.log("✅ All state updated successfully");
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        console.error("Error message:", error.message);
        console.error("Error response:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?._id]);

  const FollowUser = async (userId) => {
    try {
      const testUserId = "69a12409eecdc84cb5b6b943";
      const currentUserId = user?._id || testUserId;

      await handleFollowUser(userId);

      const followingList = await handleGetUserFollowing(currentUserId);
      const suggested = await handleGetUserToFollow(currentUserId);

      setFollowing(followingList || []);
      setSuggestedUsers(suggested || []);
    } catch (error) {
      console.error("❌ Error following user:", error);
    }
  };

  const UnFollowUser = async (userId) => {
    try {
      const testUserId = "69a12409eecdc84cb5b6b943";
      const currentUserId = user?._id || testUserId;

      await handleUnFollowUser(userId);

      const followingList = await handleGetUserFollowing(currentUserId);
      const followersList = await handleGetUserFollowers(currentUserId);
      const suggested = await handleGetUserToFollow(currentUserId);

      setFollowing(followingList || []);
      setFollowers(followersList || []);
      setSuggestedUsers(suggested || []);
    } catch (error) {
      console.error("❌ Error unfollowing user:", error);
    }
  };

  if (loading) return <div className="follow-container">Loading...</div>;

  return (
    <div className="follow-sidebar">
      {/* User Profile Section */}
      <div className="follow-profile-card">
        <img
          src={userProfile?.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="follow-profile-image"
        />
        <h3 className="follow-profile-name">{userProfile?.username}</h3>
        <p className="follow-profile-username">@{userProfile?.username}</p>

        {/* Stats Section */}
        <div className="follow-stats">
          <div className="follow-stat-item">
            <span className="follow-stat-number">{followers.length}</span>
            <span className="follow-stat-label">Followers</span>
          </div>
          <div className="follow-stat-item">
            <span className="follow-stat-number">{following.length}</span>
            <span className="follow-stat-label">Following</span>
          </div>
        </div>
      </div>

      {/* Followers Section */}
      <div className="follow-followers">
        <h4 className="follow-section-title">Followers</h4>
        <div className="follow-users-list">
          {followers.length === 0 ? (
            <p className="follow-empty-message">No followers yet</p>
          ) : (
            followers.map((follower) => (
              <div key={follower._id} className="follow-user-item">
                <img
                  src={follower.profileImage || "/default-avatar.png"}
                  alt={follower.username}
                  className="follow-user-avatar"
                />
                <div className="follow-user-info">
                  <p className="follow-user-name">{follower.username}</p>
                  <p className="follow-user-handle">@{follower.username}</p>
                  {following.some((f) => f._id === follower._id) ? (
                    <button
                      className="unfollow-btn"
                      onClick={() => UnFollowUser(follower._id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="follow-btn"
                      onClick={() => FollowUser(follower._id)}
                    >
                      Follow Back
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Following Section */}
      <div className="follow-following">
        <h4 className="follow-section-title">Following</h4>
        <div className="follow-users-list">
          {following.length === 0 ? (
            <p className="follow-empty-message">Not following anyone yet</p>
          ) : (
            following.map((followedUser) => (
              <div key={followedUser._id} className="follow-user-item">
                <img
                  src={followedUser.profileImage || "/default-avatar.png"}
                  alt={followedUser.username}
                  className="follow-user-avatar"
                />
                <div className="follow-user-info">
                  <p className="follow-user-name">{followedUser.username}</p>
                  <p className="follow-user-handle">@{followedUser.username}</p>
                  <button
                    className="unfollow-btn"
                    onClick={() => UnFollowUser(followedUser._id)}
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Suggested Users Section */}
      <div className="follow-suggestions">
        <h4 className="follow-section-title">Suggested For You</h4>
        <div className="follow-users-list">
          {suggestedUsers.length === 0 ? (
            <p className="follow-empty-message">No suggestions available</p>
          ) : (
            suggestedUsers.map((suggestedUser) => (
              <div key={suggestedUser._id} className="follow-user-item">
                <img
                  src={suggestedUser.profileImage || "/default-avatar.png"}
                  alt={suggestedUser.username}
                  className="follow-user-avatar"
                />
                <div className="follow-user-info">
                  <p className="follow-user-name">{suggestedUser.username}</p>
                  <p className="follow-user-handle">
                    @{suggestedUser.username}
                  </p>
                </div>
                <button
                  className="follow-btn"
                  onClick={() => FollowUser(suggestedUser._id)}
                >
                  Follow
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Follow;
