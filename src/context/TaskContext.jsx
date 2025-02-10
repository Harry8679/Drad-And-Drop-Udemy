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
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksArray);
    } catch (error) {
      console.error("❌ Erreur de récupération des tâches :", error);
    }
  };

  // ➕ Ajouter une tâche
  const addTask = async (task) => {
    if (typeof task !== "object" || !task.content) {
      console.error("❌ La tâche doit être un objet valide !");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      setTasks([...tasks, { id: docRef.id, ...task }]);
      console.log("✅ Tâche ajoutée :", { id: docRef.id, ...task });
    } catch (error) {
      console.error("🔥 Erreur lors de l'ajout de la tâche :", error);
    }
  };

  // ❌ Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
      console.log(`🗑️ Tâche supprimée : ${id}`);
    } catch (error) {
      console.error("❌ Erreur de suppression :", error);
    }
  };

  // ✏️ Mettre à jour une tâche
  const updateTask = async (id, updatedTask) => {
    try {
      await updateDoc(doc(db, "tasks", id), updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
      console.log(`🔄 Tâche mise à jour : ${id}`, updatedTask);
    } catch (error) {
      console.error("❌ Erreur de mise à jour :", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}