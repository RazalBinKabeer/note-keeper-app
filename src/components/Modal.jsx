import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, onSave, note }) => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  // Populate fields if editing a note
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTagline(note.tagline);
      setBody(note.body);
    } else {
      resetForm(); // Reset if adding a new note
    }
  }, [note]);

  const resetForm = () => {
    setTitle("");
    setTagline("");
    setBody("");
  };

  const handleSave = () => {
    if (!title.trim() || !tagline.trim() || !body.trim()) {
      toast.error("All fields are required!");
      return;
    }

    onSave({ title, tagline, body });
    resetForm(); // Reset the form after saving
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {note ? "Edit Note" : "Add Note"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded mb-4 h-28"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => {
              resetForm(); // Reset the form on cancel
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-leafGreen-dark text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
