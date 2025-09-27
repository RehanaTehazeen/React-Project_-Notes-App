import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import NoteCard from "../components/NoteCard";
// import { formatDistanceToNow } from "date-fns";

const CATEGORIES = ["Work", "Personal", "Idea", "Other"];

export default function Home() {
  const { notes, setNotes, getAllNotes, deleteNote, togglePin, loading } = useContext(AppContext);
  const [q, setQ] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
//   const [searchParams] = useSearchParams();

  useEffect(() => {
    // initialize notes into context from mockApi if context empty
    if (notes.length === 0) {
      getAllNotes().then(fetched => {
        if (fetched && fetched.length) setNotes(fetched);
      });
    }
    // eslint-disable-next-line
  }, []);

  // filtered notes
  const filtered = useMemo(() => {
    let arr = [...notes];
    if (selectedCat) arr = arr.filter(n => n.category === selectedCat);
    if (q) {
      const qq = q.toLowerCase();
      arr = arr.filter(n => (n.title + " " + n.content).toLowerCase().includes(qq));
    }
    // pinned first
    arr.sort((a,b) => (b.pinned === a.pinned) ? (new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)) : (b.pinned ? 1 : -1));
    return arr;
  }, [notes, q, selectedCat]);

  // show pinned separately if any
  const pinned = filtered.filter(n => n.pinned);
  const others = filtered.filter(n => !n.pinned);

  return (
    <div className="page home-page">
      <div className="home-top">
        <input className="search" placeholder="Search notes..." value={q} onChange={e=>setQ(e.target.value)} />
        <Link to="/new" className="btn">Create New</Link>
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
