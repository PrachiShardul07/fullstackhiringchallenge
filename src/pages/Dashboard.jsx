import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
const [editNote, setEditNote] = useState(null);


const updateNote = async () => {
  await axios.put(`/notes/${editNote._id}`, editNote);
  setEditNote(null);
  fetchNotes();
  toast.success("Note Updated");
};

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("/notes");
      setNotes(res.data);
    } catch (err) {
      setError("Failed to fetch notes");
    }
  };

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("/auth/profile");
      setProfile(res.data);
    } catch (err) {
      setError("Failed to fetch profile");
    }
  };

  // Run both once on load
  useEffect(() => {
    fetchNotes();
    fetchProfile();
  }, []);

  // Add Note
  const addNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/notes", form);
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      setError("Failed to add note");
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mt-4">

        {error && <div className="alert alert-danger">{error}</div>}

        {/* 🔹 PROFILE CARD */}
        {profile && (
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold text-primary">{profile.name}</h5>
              <p className="mb-1"><strong>Email:</strong> {profile.email}</p>
              <p className="mb-1"><strong>Country:</strong> {profile.country}</p>
              {profile.bio && (
                <p className="mb-0"><strong>Bio:</strong> {profile.bio}</p>
              )}
            </div>
          </div>
        )}

        {/* 🔹 ADD NOTE SECTION */}
        <div className="card shadow-sm p-3 mb-4">
          <h5 className="mb-3">Add Note</h5>
          <form onSubmit={addNote}>
            <input
              className="form-control mb-2"
              placeholder="Title"
              value={form.title}
              required
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
            <textarea
              className="form-control mb-2"
              placeholder="Content"
              value={form.content}
              required
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />
           <button className="btn btn-primary me-2">
  Add Note
</button>

<button
  className="btn btn-warning btn-sm"
  onClick={() => setEditNote(note)}
>
  Edit
</button>


          </form>
        </div>

        {/* 🔹 SEARCH */}
        <input
          className="form-control mb-3"
          placeholder="Search by title..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔹 NOTES GRID */}
        <div className="row">
          {filtered.map((note) => (
            <div className="col-md-4 mb-3" key={note._id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="fw-bold">{note.title}</h6>
                  <p className="text-muted">{note.content}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
