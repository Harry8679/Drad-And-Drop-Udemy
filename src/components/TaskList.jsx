import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

export default function TaskList({ title, tasks, droppableId }) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div className="bg-gray-200 p-4 rounded w-1/3"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}