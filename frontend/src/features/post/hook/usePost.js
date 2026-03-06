import { getFeed, createPost } from "../services/post.api";
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
    setFeed([data.post, ...feed]);
    setLoading(false);
  };
  useEffect(() => {
    handileGetFeed();
  }, []);

  return { loading, handileGetFeed, post, feed, handleCreatePost };
};
