import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function NoteCard({ note, onDelete, onTogglePin }) {
  const nav = useNavigate();
  return (
    <div className="note-card">
      <div className="note-head">
        <div className="note-title">{note.title}</div>
        <div className="note-actions">
          <button className="icon-btn" onClick={()=>onTogglePin(note.id)} title="Pin/Unpin">
            {note.pinned ? "📌" : "📍"}
          </button>
          <button className="icon-btn" onClick={()=>nav(`/edit/${note.id}`)} title="Edit">✏️</button>
          <button className="icon-btn" onClick={()=>{ if(confirm("Delete this note?")) onDelete(note.id) }} title="Delete">🗑️</button>
        </div>
      </div>

      <div className="note-preview">{note.content ? (note.content.length > 120 ? note.content.slice(0,120) + "..." : note.content) : <em>No content</em>}</div>

      <div className="note-footer">
        <span className="badge">{note.category}</span>
        <small className="muted">{
          note.updatedAt ? `updated ${formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}` :
          `created ${formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}`
        }</small>
      </div>
    </div>
  );
}
