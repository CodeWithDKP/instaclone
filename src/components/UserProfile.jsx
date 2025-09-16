import React from "react";
import usePosts from "../hooks/usePosts";
import "../App.css";

export default function UserProfile() {
  const { posts, currentUser } = usePosts();

  const myPosts = posts.filter((p) => p.author && p.author.id === currentUser.id);

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header card mb-3">
        <img src={currentUser.avatar} alt="me" className="avatar-lg" />
        <div className="profile-info">
          <div className="profile-top">
            <h4>{currentUser.name}</h4>
            <button className="btn-edit-profile">Edit Profile</button>
          </div>
          <div className="profile-stats">
            <div><strong>{myPosts.length}</strong><span>Posts</span></div>
            <div><strong>123</strong><span>Followers</span></div>
            <div><strong>200</strong><span>Following</span></div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="profile-posts-grid">
        {myPosts.map((p) =>
          p.image ? (
            <img key={p.id} src={p.image} alt="my" className="grid-image" />
          ) : (
            <div key={p.id} className="grid-placeholder">{p.text}</div>
          )
        )}
      </div>
    </div>
  );
}
