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
              <h1>Create a New Note</h1>
      <p>Fill in the details below and click save when you are done</p>
        <label>Title
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Your note title"/>
        </label>

        <label>Category
          <select value={category} onChange={e=>setCategory(e.target.value)} placeholder = "Personal">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label>Content
          <textarea value={content} onChange={e=>setContent(e.target.value)} rows={12} placeholder="Write your note here.."/>
        </label>

        <div className="editor-actions">
          <button className="btn ghost" onClick={()=>nav(-1)}>Cancel</button>
          <button className="btn" onClick={handleSave}>Save Now</button>
        </div>
      </div>
    </div>
  );
}
