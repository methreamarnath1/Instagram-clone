import React from "react";
import "../style/createPost.scss";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { usePost } from "../hook/usePost";
const CreatePost = () => {
  const [formData, setFormData] = useState({ image: null, caption: "" });
  const [preview, setPreview] = useState(null);
  const postImageInputFieldRef = useRef(null);
  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleCaptionChange = (e) => {
    setFormData({ ...formData, caption: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const file = postImageInputFieldRef.current.files[0];
    console.log(file);
    handleCreatePost(formData);
    navigate("/");
    // Add your API call here
  };
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="postImage">Upload Image</label>
            <input
              ref={postImageInputFieldRef}
              type="file"
              name="postImage"
              id="postImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          {preview && <img src={preview} alt="Preview" className="preview" />}

          <div className="input-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              placeholder="Write your post here..."
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleCaptionChange}
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="button primary-button">
            Create Post
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
