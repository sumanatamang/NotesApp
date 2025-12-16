import { Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = (id, t) => {
    api
      .delete(`/notes/${id}`)
      .then(() => {
        setNotes((prev) => prev.filter((n) => n._id !== id));
        toast.success("Note deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete note");
      })
      .finally(() => {
        toast.dismiss(t.id);
      });
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // prevent Link navigation

    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this note?</span>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleDelete(id, t)}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note?.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note?.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note?.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <Edit2 className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => confirmDelete(e, note._id)}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
