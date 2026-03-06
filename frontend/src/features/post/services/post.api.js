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
  const response = await api.post(`/api/posts/${postId}/like`);
  return response.data;
}
export async function unLikePost(postId) {
  const response = await api.post(`/api/posts/${postId}/unlike`);
  return response.data;
}
