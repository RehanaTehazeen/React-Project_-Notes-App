import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function Settings() {
  const { theme, setTheme, clearAllData, logout } = useContext(AppContext);
  const nav = useNavigate();

  const handleClear = () => {
    if (confirm("Clear ALL notes and data? This cannot be undone.")) {
      clearAllData();
      alert("All data cleared.");
    }
  };

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="page settings-page">
      <h2>Settings</h2>
      <div className="setting-row">
        <div>Theme</div>
        <div>
          <button className="btn" onClick={()=>setTheme(theme === "light" ? "dark" : "light")}>
            Switch to {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      <div className="setting-row">
        <div>Clear Data</div>
        <div><button className="btn ghost" onClick={handleClear}>Clear All Data</button></div>
      </div>

      <div className="setting-row">
        <div>Logout</div>
        <div><button className="btn danger" onClick={handleLogout}>Logout</button></div>
      </div>
    </div>
  );
}
