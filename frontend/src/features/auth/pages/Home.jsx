import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import "../style/home.scss";

const Home = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="error-container">
        <p>Please log in to continue</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Header/Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">Instagram</div>
          <div className="navbar-right">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
              <img
                src={user.profileImage || "/default-avatar.jpg"}
                alt={user.username}
                className="profile-avatar"
              />
              <span className="username">{user.username}</span>
            </div>
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="home-content">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            <div className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Home</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🔍</span>
              <span className="nav-label">Explore</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-label">Messages</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">❤️</span>
              <span className="nav-label">Likes</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👤</span>
              <span className="nav-label">Profile</span>
            </div>
          </nav>
        </aside>

        {/* Main Feed */}
        <main className="feed">
          <div className="feed-header">
            <h2>Your Feed</h2>
            <button className="create-post-btn">+ Create Post</button>
          </div>

          <div className="posts-container">
            <div className="empty-state">
              <div className="empty-icon">📸</div>
              <h3>No posts yet</h3>
              <p>Follow users to see their posts here</p>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Suggestions */}
        <aside className="suggestions-panel">
          <div className="suggestions-header">
            <h3>Suggestions For You</h3>
            <a href="#">See all</a>
          </div>
          <div className="suggestions-list">
            <div className="suggestion-item">
              <div className="suggestion-avatar">👤</div>
              <div className="suggestion-info">
                <p className="username">user123</p>
                <span className="suggestion-label">Popular</span>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
    </div>
  );
};

export default Home;
