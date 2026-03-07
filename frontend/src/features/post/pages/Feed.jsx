import React from "react";
import "../style/feed.scss";

import Post from "../components/Post";
import { usePost } from "../hook/usePost";
import { useEffect } from "react";
import CreatePost from "./CreatePost";
import Nav from "../../shared/components/Nav";
const Feed = () => {
  const { loading, handileGetFeed, feed, handleLikePost, handleUnLikePost } = usePost();
  useEffect(() => {
    handileGetFeed();
  }, []);
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
    <Nav className="nav-bar" />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => (
            <Post 
              key={post._id} 
              post={post} 
              handleLikePost={handleLikePost} 
              handleUnLikePost={handleUnLikePost} 
              loading={loading} 
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feed;
