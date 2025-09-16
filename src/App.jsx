import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import BottomNav from "./components/BottomNav";
import "./App.css";  // <-- Import CSS here once

export default function App() {
  return (
    <PostProvider>
      <Router>
        <div className="app-root">
          <header className="topbar">
            <div className="container d-flex align-items-center justify-content-between">
              <div className="left">
                <h1 className="brand">Glimmr</h1>
              </div>
              <div className="right icons">
                <i className="icon-search" />
                <i className="icon-notify" />
              </div>
            </div>
          </header>

          <main className="container app-main">
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>

          <BottomNav />
        </div>
      </Router>
    </PostProvider>
  );
}
