import React, { useRef, useState, useEffect } from "react";
import usePosts from "../hooks/usePosts";
import PostItem from "./PostItem";


export default function PostFeed() {
  const { posts } = usePosts();
  const [pageSize] = useState(5);
  const [page, setPage] = useState(1);
  const containerRef = useRef();

  const visible = posts.slice(0, page * pageSize);

  useEffect(() => {
    setPage(1); 
  }, [posts.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const options = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (visible.length < posts.length) {
            setPage((p) => p + 1);
          }
        }
      });
    }, options);

    const target = el.querySelector(".post-item:last-child");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [visible.length, posts.length]);

  return (
    <div ref={containerRef}>
      {visible.map((p) => (
        <div className="post-item" key={p.id}>
          <PostItem post={p} />
        </div>
      ))}
      {visible.length === 0 && <div className="text-center text-muted">No posts yet</div>}
    </div>
  );
}
