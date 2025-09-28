import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const CATEGORIES = ["Work", "Personal", "Idea", "Other"];

export default function Categories() {
  const { notes } = useContext(AppContext);

  return (
    <div className="page categories-page">
      <h2>Categories</h2>
      <p>Browse your notes by Category</p>
      <div className="categories-list">
        {CATEGORIES.map(cat => (
          <Link key={cat} to={`/?category=${encodeURIComponent(cat)}`} className="category-item">
            <div className="cat-name">{cat}</div>
            <div className="cat-count">{notes.filter(n=>n.category===cat).length}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
