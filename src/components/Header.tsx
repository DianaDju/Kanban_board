import React, { useState } from "react";
import "../styles/Header.css";

const Header = () => {
  // Состояние: открыто меню или нет
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="header-title">Awesome Kanban Board</h1>

      <div className="user-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="avatar">
          <img className="avatar-img" src="/user-avatar.svg" alt="User" />
          {/* Стрелочка меняется в зависимости от состояния isMenuOpen */}
          <span>{isMenuOpen ? "▲" : "▼"}</span>
        </div>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-pointer"></div> {/* Тот самый хвостик */}
            <ul className="dropdown-list">
              <li className="dropdown-item">Profile</li>
              <li className="dropdown-item">Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
