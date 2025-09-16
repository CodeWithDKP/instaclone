import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiPlusSquare, FiUser } from "react-icons/fi";


export default function BottomNav() {
  return (
    <nav className="bottom-nav d-flex justify-content-around align-items-center">
      <NavLink to="/" className="nav-btn" end>
        <FiHome size={22} />
      </NavLink>
      <NavLink to="/" className="nav-btn">
        <FiPlusSquare size={22} />
      </NavLink>
      <NavLink to="/profile" className="nav-btn">
        <FiUser size={22} />
      </NavLink>
    </nav>
  );
}
