import React, { createContext, useState, useEffect } from "react";
import { sampleInitialPosts } from "../utils/sampleData";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const STORAGE_KEY = "instaclone_posts_v1";
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
      // seed initial demo posts
      return sampleInitialPosts();
    } catch {
      return sampleInitialPosts();
    }
  });

  // Demo current user
  const currentUser = { id: "me", name: "You", avatar: "https://i.pravatar.cc/150?img=3" };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.warn("Failed to save posts", e);
    }
  }, [posts]);

  // create post (text + optional image dataURL)
  const createPost = ({ text, image }) => {
    const newPost = {
      id: Date.now().toString(),
      author: currentUser,
      text: text || "",
      image: image || null,
      likes: [], // array of user ids
      comments: [], // array of { id, user, text, createdAt }
      createdAt: Date.now()
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const toggleLike = (postId, userId) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const liked = p.likes.includes(userId);
        return {
          ...p,
          likes: liked ? p.likes.filter(id => id !== userId) : [...p.likes, userId]
        };
      })
    );
  };

  const addComment = (postId, user, text) => {
    const comment = { id: Date.now().toString(), user, text, createdAt: Date.now() };
    setPosts(prev => prev.map(p => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)));
    return comment;
  };

  // sharePost returns boolean (true success)
  const sharePost = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return false;
    const link = `${window.location.origin}/post/${postId}`;
    // try clipboard API
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
        return true;
      }
    } catch (e) {
      console.warn("clipboard failed", e);
    }
    // fallback: textarea + execCommand
    try {
      const ta = document.createElement("textarea");
      ta.value = link;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) return true;
    } catch (e) {
      /* ignore */
    }
    // final: prompt so user can copy manually
    try {
      // eslint-disable-next-line no-alert
      window.prompt("Copy this link", link);
    } catch {}
    return false;
  };

  // Simulate real-time posts from other users every 20s
  useEffect(() => {
    const others = [
      { id: "u2", name: "Anita", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: "u3", name: "Rahul", avatar: "https://i.pravatar.cc/150?img=7" }
    ];
    const texts = [
      "Hello from the other side!",
      "This is a simulated live post",
      "Sharing something interesting 🚀"
    ];
    const interval = setInterval(() => {
      const who = others[Math.floor(Math.random() * others.length)];
      const text = texts[Math.floor(Math.random() * texts.length)];
      const newPost = {
        id: Date.now().toString(),
        author: who,
        text,
        image: Math.random() > 0.6 ? `https://picsum.photos/seed/${Math.random().toString(36).slice(2,8)}/600/600` : null,
        likes: [],
        comments: [],
        createdAt: Date.now()
      };
      setPosts(prev => [newPost, ...prev]);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PostContext.Provider value={{ posts, createPost, toggleLike, addComment, sharePost, currentUser }}>
      {children}
    </PostContext.Provider>
  );
}
