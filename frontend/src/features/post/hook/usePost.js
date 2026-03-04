import { getFeed } from "../services/post.api";
 import { useContext } from "react";
 import { PostContext } from "../post.context.jsx";

 export const usePost = () => {
    const  context = useContext(PostContext);

        const { loading,setFeed,setPost,post,feed,setLoading} = context;
    const handileGetFeed = async()=>{
        const data = await getFeed();
        setLoading(true);
        setFeed(data.posts);
        setLoading(false);

    }
    return {loading,handileGetFeed,post,feed}
} 