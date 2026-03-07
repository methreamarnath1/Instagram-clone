import { getFeed, createPost,likePost,unLikePost,followUser,unFollowUser,getUserFollowers,getUserProfile,getUserFollowing,usertofollow } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";
import { useEffect } from "react";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setFeed, setPost, post, feed, setLoading } = context;
  const handileGetFeed = async () => {
    const data = await getFeed();
    setLoading(true);
    setFeed(data.posts);
    setLoading(false);
  };
  const handleCreatePost = async (formData) => {
    setLoading(true);
    const data = await createPost(formData);
    setFeed([data.post, ...feed].reverse());
    setLoading(false);
  };
  const handleLikePost = async (postId) => {
    setLoading(true);
    const data = await likePost(postId);
    setFeed(feed.map((post) => (post._id === postId ? { ...post, isLiked: true } : post)));
    setLoading(false);
  };
  const handleUnLikePost = async (postId) => {
    setLoading(true);
    const data = await unLikePost(postId);
    setFeed(feed.map((post) => (post._id === postId ? { ...post, isLiked: false } : post)));
    setLoading(false);
  };
  const  handleFollowUser = async (userId) => {
      // we will send a request to the backend to follow the user and then we will update the feed
    await followUser(userId);
  }
  const handleUnFollowUser = async (userId) => {
      // we will send a request to the backend to unfollow the user and then we will update the feed
    await unFollowUser(userId);
  }

  const handleGetUserProfile = async (userId) => {
    const data = await getUserProfile(userId);
    return data;
  }
  const handleGetUserFollowers = async (userId) => {
    const data = await getUserFollowers(userId);
    return data;
  }
  const handleGetUserFollowing = async (userId) => {
    const data = await getUserFollowing(userId);
    return data;
  }
  const handleGetUserToFollow = async (userId) => {
    const data = await usertofollow(userId);
    return data;
  }

  useEffect(() => {
    handileGetFeed();
  }, []);

  return { loading, handileGetFeed, post, feed, handleCreatePost,handleLikePost,handleUnLikePost,handleFollowUser,handleUnFollowUser,handleGetUserProfile,handleGetUserFollowers,handleGetUserFollowing,handleGetUserToFollow};
};
