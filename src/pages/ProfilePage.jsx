import React, { useState } from "react";
import usePosts from "../hooks/usePosts";
import ImageUploader from "../components/ImageUploader";
import PostItem from "../components/PostItem";

export default function ProfilePage() {
  const { posts, currentUser, updateProfile, removePost } = usePosts();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [avatarFile, setAvatarFile] = useState(null);

  // user's posts
  const myPosts = posts.filter((p) => p.author && p.author.id === currentUser.id);

  const handleSave = (e) => {
    e?.preventDefault?.();
    updateProfile(name, avatarFile);
    setAvatarFile(null);
    setEditing(false);
    // small notification (you can replace with toast)
    // eslint-disable-next-line no-alert
    alert("Profile updated");
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header card mb-3">
        <img src={currentUser.avatar} alt="me" className="avatar-lg" />
        <div className="profile-info">
          <div className="profile-top">
            <h4>{currentUser.name}</h4>
            <button
              className="btn-edit-profile"
              onClick={() => {
                setName(currentUser.name);
                setEditing((s) => !s);
              }}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="profile-stats">
            <div>
              <strong>{myPosts.length} </strong>
              <span>Posts</span>
            </div>
            <div>
              <strong>123 </strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>200 </strong>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="edit-profile-form card mb-3 p-3">
          <label style={{ display: "block", marginBottom: 8 }}>
            Name
            <input
              type="text"
              value={name}
              placeholder="Enter new name"
              onChange={(e) => setName(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #444",
                background: "#1f1f1f",
                color: "#fff",
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: 10 }}>
            Profile picture
            <div style={{ marginTop: 8 }}>
              <ImageUploader returnFile onImageSelect={setAvatarFile} />
            </div>
          </label>

          {avatarFile && (
            <div style={{ marginTop: 12 }}>
              <img
                src={URL.createObjectURL(avatarFile)}
                alt="preview"
                style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
          )}

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="btn-edit-profile" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button className="btn-post" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* My posts grid (thumbnails with remove) */}
      <div style={{ marginTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5>My Posts</h5>
        </div>

        {myPosts.length === 0 && <div className="text-center text-muted">You haven't posted anything yet.</div>}

        <div className="profile-posts-grid" style={{ marginTop: 8 }}>
          {myPosts.map((p) => (
            <div key={p.id} style={{ position: "relative" }} className="grid-item">
              {p.image ? (
                <img src={p.image} alt="my" className="grid-image" />
              ) : (
                <div className="grid-placeholder">{p.text}</div>
              )}

              {/* Remove button */}
              <button
                onClick={() => {
                  // confirm delete
                  // eslint-disable-next-line no-alert
                  if (window.confirm("Remove this post?")) removePost(p.id);
                }}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                aria-label="Remove post"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
