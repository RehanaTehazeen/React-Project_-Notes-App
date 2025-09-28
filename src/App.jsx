import React, { useContext } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NoteEditor from "./pages/NoteEditor";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import { AppContext } from "./contexts/AppContext";

function Protected({ children }) {
  const { token } = useContext(AppContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
    const { token } = useContext(AppContext);

  return (
    <div className="app-root">
      {token && (
      <aside className="sidebar">
        <Link to="/" className="logo">CollabNotes Lite</Link>
        <nav className = "sidebar-menu">
          <Link to ="/new" className="btn"> + New Note</Link>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>
      )}

      <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Home/></Protected>} />
          <Route path="/new" element={<Protected><NoteEditor/></Protected>} />
          <Route path="/edit/:id" element={<Protected><NoteEditor/></Protected>} />
          <Route path="/categories" element={<Protected><Categories/></Protected>} />
          <Route path="/settings" element={<Protected><Settings/></Protected>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

// export default function App() {
//   return (
//     <div className="app-root">
//       <header className="app-header">
//         <Link to="/" className="logo">CollabNotes Lite</Link>
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/categories">Categories</Link>
//           <Link to="/settings">Settings</Link>
//         </nav>
//       </header>

//       <main className="app-main">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Protected><Home/></Protected>} />
//           <Route path="/new" element={<Protected><NoteEditor/></Protected>} />
//           <Route path="/edit/:id" element={<Protected><NoteEditor/></Protected>} />
//           <Route path="/categories" element={<Protected><Categories/></Protected>} />
//           <Route path="/settings" element={<Protected><Settings/></Protected>} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }
