import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏗 Gestionnaire de Tâches</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}