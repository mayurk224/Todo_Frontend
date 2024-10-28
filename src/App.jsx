import React, { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]); // State for storing notes
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch notes when the component is mounted
  useEffect(() => {
    refreshNotes();
  }, []);

  // Function to refresh the list of notes
  const refreshNotes = async () => {
    try {
      const res = await fetch(API_URL + "api/todoapp/GetNotes");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // Function to add a new note
  const addClick = async () => {
    try {
      const newNotes = document.getElementById("newNotes").value.trim(); // Get the input value and trim whitespace

      // Check if newNotes is empty
      if (!newNotes) {
        alert("Please enter a note before submitting.");
        return; // Exit the function early
      }

      const response = await fetch(API_URL + "api/todoapp/AddNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newNotes }), // Send new note as JSON
      });

      const result = await response.json(); // Parse the response

      if (response.ok) {
        refreshNotes(); // Refresh notes after adding
      } else {
        alert(result.error || "Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("An error occurred while adding the note.");
    }
  };

  // Function to delete a note
  const deleteClick = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}api/todoapp/DeleteNotes?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json(); // Parse the response

      if (response.ok) {
        alert(result.message || "Note deleted successfully");
        refreshNotes(); // Refresh notes after deletion
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
            id="newNotes"
            placeholder="Add a new note"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addClick}
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
                  {note.id}
                  {"."}
                  {note.description}
                </b>
              </p>
              <button
                onClick={() => deleteClick(note.id)}
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
