import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const CATEGORIES = ["Work", "Personal", "Idea", "Other"];

export default function NoteEditor() {
  const { id } = useParams();
  const { notes, addNote, updateNote } = useContext(AppContext);
  const nav = useNavigate();

  const existing = notes.find(n => n.id === id);
  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");
  const [category, setCategory] = useState(existing?.category || "Other");

  useEffect(() => {
    if (id && !existing) {
      // editing but not found: go back
      nav("/");
    }
  }, [id, existing, nav]);

  const handleSave = async () => {
    if (id) {
      await updateNote(id, { title, content, category });
    } else {
      await addNote({ title, content, category, pinned: false});
    }
    nav("/");
  };

  return (
    <div className="page editor-page">
      <div className="editor-card">
        <label>Title
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter title"/>
        </label>

        <label>Category
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label>Content
          <textarea value={content} onChange={e=>setContent(e.target.value)} rows={12} placeholder="Write your note..."/>
        </label>

        <div className="editor-actions">
          <button className="btn" onClick={handleSave}>Save</button>
          <button className="btn ghost" onClick={()=>nav(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
