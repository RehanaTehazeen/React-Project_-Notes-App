import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function NoteCard({ note, onDelete, onTogglePin }) {
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryColors ={
    Work: "#1a6cf0ff",
    Personal: "#11d479ff",
    Idea: "#cff10cff",
    Other: "#8b5cf6"
  }

  return (
    <div className="note-card">
      <div className="note-head">
        <div className="note-title">{note.title}</div>
        <span className= "note-category" style = {{ backgroundColor: categoryColors[note.category]}}>{note.category}</span>

        <div className="note-menu-wrapper" ref={menuRef}>
          <button className="icon-btn" onClick={() => setMenuOpen((prev) => !prev)} title="Options"> ⋮ </button>
          {menuOpen && (
            <div className="note-menu">
              <button onClick={() => onTogglePin(note.id)}> {note.pinned ? "Unpin" : "Pin"} </button>
              <button onClick={() => nav(`/edit/${note.id}`)}>Edit</button>
              <button onClick={() => {
                  if (confirm("Delete this note?")) onDelete(note.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="note-preview">
        {note.content
          ? note.content.length > 120
            ? note.content.slice(0, 120) + "..."
            : note.content
          : <em>No content</em>}
      </div>

      <div className="note-footer">
        <small className="muted">
          {note.updatedAt
            ? `updated ${formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}`
            : `created ${formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}`}
        </small>
      </div>
    </div>
  );
}
