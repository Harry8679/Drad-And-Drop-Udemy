import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <nav className="bg-blue-600 p-4 text-white text-center">
          <Link to="/">🏗️ Gestionnaire de Tâches</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}