import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function TaskForm() {
  const [content, setContent] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // ✅ On envoie un objet bien structuré à Firebase
    addTask({ content, status: "todo" });

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Ajouter une tâche..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
    </form>
  );
}