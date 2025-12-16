import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    setError(false);
    setIsRateLimited(false);

    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes:", err);

      if (!err.response) {
        // Network or server unreachable
        toast.error("Network error or server not reachable");
        setError(true);
      } else if (err.response.status === 429) {
        // Rate limited
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {/* Rate Limit Warning */}
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Loading */}
        {loading && (
          <div className="text-center text-primary py-10 text-lg">
            Loading notes...
          </div>
        )}

        {/* Error with Retry */}
        {error && !loading && (
          <div className="text-center py-10 space-y-4">
            <p className="text-red-500 text-lg">Failed to load notes.</p>
            <button onClick={fetchNotes} className="btn btn-primary">
              Retry
            </button>
          </div>
        )}

        {/* No notes */}
        {!loading && !error && notes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {/* Notes Grid */}
        {!loading && !error && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
