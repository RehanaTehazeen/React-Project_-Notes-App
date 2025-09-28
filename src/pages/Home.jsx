import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import NoteCard from "../components/NoteCard";


const CATEGORIES = ["Work", "Personal", "Idea", "Other"];

export default function Home() {
  const { notes, setNotes, getAllNotes, deleteNote, togglePin, loading } = useContext(AppContext);
  const [q, setQ] = useState("");
  const [selectedCat, setSelectedCat] = useState("");


useEffect(() => {
  getAllNotes(); // will only fetch if notes empty
}, []);

  // filtered notes
  const filtered = useMemo(() => {
    let arr = [...notes];
    if (selectedCat) arr = arr.filter(n => n.category === selectedCat);
    if (q) {
      const qq = q.toLowerCase();
      arr = arr.filter(n => (n.title + " " + n.content).toLowerCase().includes(qq));
    }
    arr.sort((a,b) => (b.pinned === a.pinned) ? (new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)) : (b.pinned ? 1 : -1));
    return arr;
  }, [notes, q, selectedCat]);

  const pinned = filtered.filter(n => n.pinned);
  const others = filtered.filter(n => !n.pinned);

  return (
    <div className="page home-page">
      <div className="home-top">
        <div className = "home-row1">
          <h1>Your Notes</h1>
        </div>
        <div className = "home-row2">
          <div className = "home-left-text">
            <p>Search, create, and manage your notes.</p>
          </div>
          <div className = "home-right-text">
            <input className="search" placeholder="Search notes by title or content." value={q} onChange={e=>setQ(e.target.value)} />
            <Link to="/new" className="btn">+ New Note</Link>
          </div>
        </div>
      </div>

      <div className="categories-row">
        <button onClick={()=>setSelectedCat("")} className={!selectedCat ? "active" : ""}>All</button>
        {CATEGORIES.map(c => (
          <button key={c} onClick={()=>setSelectedCat(c)} className={selectedCat===c ? "active" : ""}>
            {c} ({notes.filter(n=>n.category===c).length})
          </button>
        ))}
      </div>

      {loading && <div className="muted">Loading...</div>}

      {pinned.length > 0 && (
        <>
          <h3>Pinned</h3>
          <div className="notes-grid">
            {pinned.map(n => <NoteCard key={n.id} note={n} onDelete={deleteNote} onTogglePin={togglePin} />)}
          </div>
        </>
      )}

      <h3>All Notes</h3>
      <div className="notes-grid">
        {others.length ? others.map(n => <NoteCard key={n.id} note={n} onDelete={deleteNote} onTogglePin={togglePin} />)
        : <div className="muted">No notes yet. Create one!</div>}
      </div>
    </div>
  );
}
