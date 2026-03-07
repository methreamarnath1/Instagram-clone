import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/api/posts/feed");
  return response.data;
}

export async function createPost(formData) {
  const formDataToSend = new FormData();
  formDataToSend.append("caption", formData.caption);
  formDataToSend.append("image", formData.image);
  const response = await api.post("/api/posts/", formDataToSend);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/api/posts/like/${postId}`);
  return response.data;
}

export async function unLikePost(postId) {
  const response = await api.post(`/api/posts/unlike/${postId}`);
  return response.data;
}

export async function followUser(userId) {
  const response = await api.post(`/api/users/follow/${userId}`);
  return response.data;
}

export async function unFollowUser(userId) {
  const response = await api.post(`/api/users/unfollow/${userId}`);
  return response.data;
}

export async function getUserProfile(userId) {
  const response = await api.get(`/api/users/profile/${userId}`);
  return response.data.user; // Unwrap the user object
}

export async function getUserFollowers(userId) {
  const response = await api.get(`/api/users/followers/${userId}`);
  return response.data.followers; // Return the followers array directly
}

export async function getUserFollowing(userId) {
  const response = await api.get(`/api/users/following/${userId}`);
  return response.data.following; // Return the following array directly
}

export async function usertofollow(userId) {
  const response = await api.get(`/api/users/tofollow/${userId}`);
  return response.data.toFollow; // Return the toFollow array directly
}