import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: "1", content: "Apprendre React", status: "todo" },
    { id: "2", content: "Construire un projet", status: "inProgress" },
    { id: "3", content: "Déployer sur Vercel", status: "done" },
  ]);

  const addTask = (content) => {
    setTasks([...tasks, { id: Date.now().toString(), content, status: "todo" }]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
}