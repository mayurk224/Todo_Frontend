import React, { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]); // State for storing notes
  const [newNote, setNewNote] = useState(""); // State for new note input
  const API_URL = "http://localhost:5030";

  // Fetch notes from the server
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/todoapp/GetNotes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // useEffect to call fetchNotes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to add a new note
  const addNote = async () => {
    if (!newNote.trim()) {
      alert("Please enter a note before submitting.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/todoapp/AddNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newNotes: newNote.trim() }),
      });

      const result = await response.json();

      if (response.ok) {
        setNewNote(""); // Clear input after successful addition
        fetchNotes(); // Refresh notes after adding
      } else {
        alert(result.error || "Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("An error occurred while adding the note.");
    }
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/todoapp/DeleteNotes?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Note deleted successfully");
        fetchNotes(); // Refresh notes after deletion
      } else {
        alert(result.error || "Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("An error occurred while deleting the note.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Todo App
        </h2>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)} // Update state on input change
            placeholder="Add a new note"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addNote}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm"
            >
              <p className="text-gray-700">
                <b>
                  {note.id}. {note.description}
                </b>
              </p>
              <button
                onClick={() => deleteNote(note.id)} // Use MongoDB's _id for deletion
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
