import React, { useEffect, useState } from "react";
import * as mockApi from "../mockApi";
import { AppContext } from "./AppContext";

const NOTES_KEY = "collabnotes_notes_v1";
const TOKEN_KEY = "collabnotes_token_v1";
const THEME_KEY = "collabnotes_theme_v1";

export function AppProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || "light");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) setNotes(JSON.parse(raw));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const login = async (username, password) => {
    if (!username || !password) throw new Error("Invalid credentials");
    const fakeToken = `token_${username}_${Date.now()}`;
    localStorage.setItem(TOKEN_KEY, fakeToken);
    setToken(fakeToken);
    return fakeToken;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const getAllNotes = async () => {
    setLoading(true);
    const res = await mockApi.getNotes();
    setLoading(false);
    return res;
  };

  const addNote = async (note) => {
    setLoading(true);
    const created = await mockApi.addNote(note);
    setNotes(prev => [created, ...prev]);
    setLoading(false);
    return created;
  };

  const updateNote = async (id, updates) => {
    setLoading(true);
    const updated = await mockApi.updateNote(id, updates);
    setNotes(prev => prev.map(n => n.id === id ? updated : n));
    setLoading(false);
    return updated;
  };

  const deleteNote = async (id) => {
    setLoading(true);
    await mockApi.deleteNote(id);
    setNotes(prev => prev.filter(n => n.id !== id));
    setLoading(false);
  };

  const clearAllData = () => {
    setNotes([]);
    localStorage.removeItem(NOTES_KEY);
  };

  const togglePin = async (id) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    return updateNote(id, { pinned: !note.pinned });
  };

  return (
    <AppContext.Provider value={{
      notes, setNotes,
      token, login, logout,
      theme, setTheme,
      loading,
      getAllNotes, addNote, updateNote, deleteNote,
      clearAllData, togglePin
    }}>
      {children}
    </AppContext.Provider>
  );
}
