import React, { useState } from "react";
import usePosts from "../hooks/usePosts";
import CommentSection from "./CommentSection";

export default function PostItem({ post }) {
  const { toggleLike, sharePost, currentUser } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const liked = post.likes.includes(currentUser.id);

  const safeText = (v) => (typeof v === "string" || typeof v === "number" ? v : "");

  const handleShare = async () => {
    const ok = await sharePost(post.id);
    if (ok) alert("Link copied to clipboard");
    else alert("Could not copy automatically. A prompt was shown for manual copy.");
  };

  return (
    <div className="card post-card mb-3 shadow-sm">
      <div className="card-header d-flex align-items-center gap-2">
        <img src={post.author.avatar} alt="a" className="avatar-sm" />
        <div>
          <div className="fw-bold">{safeText(post.author.name)}</div>
          <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      </div>

      {post.image && <img src={post.image} alt="post" className="post-image" />}

      <div className="card-body">
        <p className="post-text">{safeText(post.text)}</p>

        <div className="d-flex align-items-center gap-2 mb-2">
          <button
            className={`btn btn-like ${liked ? "liked" : ""}`}
            onClick={() => toggleLike(post.id, currentUser.id)}
          >
            {liked ? "❤️" : "🤍"} {post.likes.length}
          </button>

          <button className="btn btn-action" onClick={() => setShowComments((s) => !s)}>
            💬 {post.comments.length}
          </button>

          <button className="btn btn-action" onClick={handleShare}>
            🔗 Share
          </button>
        </div>

        {showComments && <CommentSection post={post} />}
      </div>
    </div>
  );
}
