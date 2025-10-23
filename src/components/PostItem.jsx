import React, { useState } from "react";
import usePosts from "../hooks/usePosts";
import CommentSection from "./CommentSection";
import { FiHeart, FiMessageCircle, FiSend, FiBookmark } from "react-icons/fi";

export default function PostItem({ post }) {
  const { toggleLike, sharePost, currentUser, removePost } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false); 
  const liked = post.likes.includes(currentUser.id);
  const safeText = (v) => (typeof v === "string" || typeof v === "number" ? v : "");
  const handleShare = async () => {
    const ok = await sharePost(post.id);
    if (ok) alert("Link copied to clipboard");
    else alert("Could not copy automatically. A prompt was shown for manual copy.");
  };

  return (
    <div className="card post-card glass mb-3 shadow-sm">
      {/* ==== Post Header ==== */}
      <div className="card-header d-flex align-items-center gap-2">
        <img src={post.author.avatar} alt="a" className="avatar-sm" />
        <div style={{ flex: 1 }}>
          <div className="fw-bold">{safeText(post.author.name)}</div>
          <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
        </div>

        {/* Remove button if current user's post */}
        {post.author && post.author.id === currentUser.id && (
          <button
            onClick={() => {
              if (window.confirm("Remove this post?")) removePost(post.id);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#ff6b6b",
              cursor: "pointer",
              fontSize: 14,
            }}
            aria-label="Remove post"
            title="Remove post"
          >
            Remove
          </button>
        )}
      </div>

      {/* ==== Post Image ==== */}
      {post.image && <img src={post.image} alt="post" className="post-image" />}

      <div className="card-body">
        <p className="post-text">{safeText(post.text)}</p>

        {/* ==== Post Actions in columns ==== */}
        <div className="row text-center mb-2">
          <div className="col">
            <button
              className={`btn btn-like ${liked ? "liked" : ""}`}
              onClick={() => toggleLike(post.id, currentUser.id)}
            >
              <FiHeart size={22} color={liked ? "red" : "white"} /> {post.likes.length}
            </button>
          </div>

          <div className="col">
            <button className="btn btn-action" onClick={() => setShowComments((s) => !s)}>
              <FiMessageCircle size={22} /> {post.comments.length}
            </button>
          </div>

          <div className="col">
            <button className="btn btn-action" onClick={handleShare}>
              <FiSend size={22} /> Share
            </button>
          </div>

          <div className="col">
            <button
              className="btn btn-action"
              onClick={() => setSaved((s) => !s)}
              title={saved ? "Unsave" : "Save"}
            >
              <FiBookmark size={22} color={saved ? "#1da1f2" : "white"} />
            </button>
          </div>
        </div>

        {/* ==== Comment Section ==== */}
        {showComments && <CommentSection post={post} />}
      </div>
    </div>
  );
}
