import { useState } from 'react';
import {createContext} from 'react'

export const PostContext = createContext()


export const PostContextProvider = ({children})=>{
const [post,setPost] = useState(null);
const [loading,setLoading] = useState(false);
const [feed,setFeed] = useState([]);
  return (
    <PostContext.Provider value={{post,loading,feed,setPost,setLoading,setFeed}}> 
        {children}
    </PostContext.Provider>
  )
}
