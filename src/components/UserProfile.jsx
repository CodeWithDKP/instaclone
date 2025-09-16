import React, { createContext, useState, useEffect } from "react";
import { sampleInitialPosts } from "../utils/sampleData";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const STORAGE_KEY = "instaclone_posts_v1";
  const USER_KEY = "instaclone_user_v1";

  // posts state
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : sampleInitialPosts();
    } catch {
      return sampleInitialPosts();
    }
  });

  // current user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw
        ? JSON.parse(raw)
        : { id: "me", name: "You", avatar: "https://i.pravatar.cc/150?img=3" };
    } catch {
      return { id: "me", name: "You", avatar: "https://i.pravatar.cc/150?img=3" };
    }
  });

  // persist posts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.warn("Failed to save posts", e);
    }
  }, [posts]);

  // persist user
  useEffect(() => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.warn("Failed to save user", e);
    }
  }, [currentUser]);

  // update profile (name + avatar)
  const updateProfile = (name, avatarFile) => {
    if (!name && !avatarFile) return;

    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser((prev) => ({
          ...prev,
          name: name || prev.name,
          avatar: reader.result, // base64 image stored
        }));
      };
      reader.readAsDataURL(avatarFile);
    } else {
      setCurrentUser((prev) => ({ ...prev, name }));
    }
  };

  // create post
  const createPost = ({ text, image }) => {
    const newPost = {
      id: Date.now().toString(),
      author: currentUser,
      text: text || "",
      image: image || null,
      likes: [],
      comments: [],
      createdAt: Date.now(),
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  // like/unlike
  const toggleLike = (postId, userId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: p.likes.includes(userId)
                ? p.likes.filter((id) => id !== userId)
                : [...p.likes, userId],
            }
          : p
      )
    );
  };

  // add comment
  const addComment = (postId, user, text) => {
    const comment = {
      id: Date.now().toString(),
      user,
      text,
      createdAt: Date.now(),
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
    return comment;
  };

  // share
  const sharePost = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return false;
    const link = `${window.location.origin}/post/${postId}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
        return true;
      }
    } catch {}
    return false;
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        toggleLike,
        addComment,
        sharePost,
        currentUser,
        updateProfile,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
