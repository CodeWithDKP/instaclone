import React, { useState } from "react";
import usePosts from "../hooks/usePosts";


export default function CommentSection({ post }) {
  const { addComment, currentUser } = usePosts();
  const [text, setText] = useState("");

  const safeText = (v) => (typeof v === "string" || typeof v === "number" ? v : "");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(post.id, { id: currentUser.id, name: currentUser.name }, text.trim());
    setText("");
  };

  return (
    <div className="mt-2 comment-section">
      <div className="existing-comments mb-2">
        {post.comments.map((c) => (
          <div key={c.id} className="d-flex gap-2 align-items-start mb-1">
            <div className="comment-avatar-placeholder" />
            <div>
              <div className="fw-bold">{safeText(c.user && c.user.name)}</div>
              <div>{safeText(c.text)}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="d-flex gap-2">
        <input
          className="form-control form-control-sm"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-sm btn-primary">Post</button>
      </form>
    </div>
  );
}
