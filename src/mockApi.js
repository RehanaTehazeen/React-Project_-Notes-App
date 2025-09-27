// mockApi.js - simulates async server behavior but persists to localStorage
const STORAGE = "collabnotes_notes_v1";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const getStore = () => {
  const raw = localStorage.getItem(STORAGE);
  return raw ? JSON.parse(raw) : [];
};

const saveStore = (arr) => localStorage.setItem(STORAGE, JSON.stringify(arr));

export const getNotes = async () => {
  await delay(300);
  return [...getStore()];
};

export const addNote = async (note) => {
  await delay(300);
  const newNote = {
    id: Date.now().toString(),
    title: note.title || "Untitled",
    content: note.content || "",
    category: note.category || "Other",
    pinned: !!note.pinned,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const s = getStore();
  s.unshift(newNote);
  saveStore(s);
  return newNote;
};

export const updateNote = async (id, updates) => {
  await delay(300);
  const s = getStore();
  const idx = s.findIndex(n => n.id === id);
  if (idx === -1) throw new Error("Note not found");
  s[idx] = {
    ...s[idx],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveStore(s);
  return s[idx];
};

export const deleteNote = async (id) => {
  await delay(200);
  const s = getStore().filter(n => n.id !== id);
  saveStore(s);
  return true;
};
