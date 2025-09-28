import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const CATEGORIES = ["Work", "Personal", "Idea", "Other"];

export default function Categories() {
  const { notes } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate(`/?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="page categories-page">
      <h2>Categories</h2>
      <p>Browse your notes by Category</p>
      <div className="categories-list">
        {CATEGORIES.map(cat => (
          <div
            key={cat}
            className="category-item"
            onClick={() => handleCategoryClick(cat)}
            style={{ cursor: "pointer" }}>
            <div className="cat-name">{cat}</div>
            <div className="cat-count">{notes.filter(n => n.category === cat).length}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
