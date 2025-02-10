import { createContext, useEffect, useState } from "react";
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "../firebaseConfig";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔄 Récupérer les tâches de Firestore
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksArray);
  };

  // ➕ Ajouter une tâche
  const addTask = async (task) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    setTasks([...tasks, { id: docRef.id, ...task }]);
  };

  // ❌ Supprimer une tâche
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✏️ Mettre à jour une tâche
  const updateTask = async (id, updatedTask) => {
    await updateDoc(doc(db, "tasks", id), updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}