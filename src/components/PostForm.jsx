import  { useState } from "react";
import usePosts from "../hooks/usePosts";
import ImageUploader from "./ImageUploader";

export default function PostForm() {
  const { createPost, currentUser } = usePosts();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posting, setPosting] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return alert("Please add text or image");
    setPosting(true);
    setTimeout(() => {
      createPost({ text: text.trim(), image });
      setText("");
      setImage(null);
      setPosting(false);
    }, 400);
  };

  return (
    <form onSubmit={submit} className="card post-form mb-3 shadow-sm">
      <div className="card-body d-flex gap-3">
        <img src={currentUser.avatar} alt="me" className="avatar-sm" />
        <div className="flex-grow-1">
          <textarea
            className="form-control post-text"
            rows={3}
            placeholder={`What's on your mind, ${currentUser.name}?`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="d-flex align-items-center justify-content-between mt-2">
            <ImageUploader onImageSelect={setImage} />
            <button className="btn btn-primary btn-post" disabled={posting}>
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
          {image && (
            <div className="mt-2">
              <img src={image} alt="preview" className="img-preview rounded" />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
