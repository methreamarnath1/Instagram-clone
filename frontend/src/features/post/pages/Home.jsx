import React from "react";
import Feed from "./Feed";
import Follow from "./Follow";
import "../style/Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-main">
        <Feed />
      </div>
      <div className="home-sidebar">
        <Follow />
      </div>
    </div>
  );
};

export default Home;
