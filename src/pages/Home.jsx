import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import {
  addNote,
  fetchNotes,
  updateNote,
  deleteNote,
} from "../firestoreService";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        toast.error("Error fetching notes!");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSaveNote = async (note) => {
    try {
      if (currentNote) {
        await updateNote(currentNote.id, note);
        setNotes((prev) =>
          prev.map((n) => (n.id === currentNote.id ? { ...n, ...note } : n))
        );
        toast.success("Note updated successfully!");
      } else {
        const savedNote = await addNote({ ...note, pinned: false });
        setNotes((prev) => [savedNote, ...prev]);
        toast.success("Note added successfully!");
      }
    } catch (error) {
      toast.error("Error saving note!");
      console.log(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Error deleting note!");
      console.log(error);
    }
  };

  const handlePinToggle = async (id, pinnedStatus) => {
    try {
      await updateNote(id, { pinned: !pinnedStatus });
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, pinned: !pinnedStatus } : note
        )
      );
      toast.success(
        `Note ${pinnedStatus ? "unpinned" : "pinned"} successfully!`
      );
    } catch (error) {
      toast.error("Error updating pin status!");
      console.log(error);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);
  const allNotes = [...pinnedNotes, ...unpinnedNotes];

  const totalPages = Math.ceil(allNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = allNotes.slice(startIndex, startIndex + notesPerPage);

  const openAddNoteModal = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-leafGreen-dark text-white px-4 py-2 rounded mb-6"
        onClick={openAddNoteModal}
      >
        Add Note
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => openEditNoteModal(note)}
            onPin={() => handlePinToggle(note.id, note.pinned)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        note={currentNote}
      />
    </div>
  );
};

export default Home;
