const NoteCard = ({ note, onEdit, onPin, onDelete }) => {
  return (
    <div className="relative bg-white p-4 rounded shadow-md">
      {/* Delete button */}
      <button
        className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded"
        onClick={onDelete}
      >
        ✕
      </button>
      <h2 className="text-lg font-bold mb-2">{note.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{note.tagline}</p>
      <p className="text-gray-800 mb-4">{note.body}</p>
      <div className="flex justify-between items-center">
        <button
          className="bg-leafGreen-dark text-white px-3 py-1 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className={`${
            note.pinned ? "bg-yellow-500" : "bg-gray-300"
          } text-black px-3 py-1 rounded`}
          onClick={onPin}
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
