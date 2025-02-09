import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const { tasks, setTasks } = useContext(TaskContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;

    const start = tasks[source.droppableId];
    const end = tasks[destination.droppableId];

    if (start === end) {
      const newTasks = Array.from(start);
      const [moved] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, moved);

      setTasks({ ...tasks, [source.droppableId]: newTasks });
    } else {
      const startTasks = Array.from(start);
      const endTasks = Array.from(end);
      const [moved] = startTasks.splice(source.index, 1);

      endTasks.splice(destination.index, 0, moved);

      setTasks({
        ...tasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: endTasks,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏗️ Gestionnaire de Tâches</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          <TaskList title="À Faire" tasks={tasks.todo} droppableId="todo" />
          <TaskList title="En Cours" tasks={tasks.inProgress} droppableId="inProgress" />
          <TaskList title="Terminé" tasks={tasks.done} droppableId="done" />
        </div>
      </DragDropContext>
    </div>
  );
}