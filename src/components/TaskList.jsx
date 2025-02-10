import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const columns = {
  todo: { name: "À Faire" },
  inProgress: { name: "En Cours" },
  done: { name: "Terminé" },
};

export default function TaskList() {
  const { tasks, updateTask } = useContext(TaskContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    updateTask(result.draggableId, { status: result.destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-6">
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-4 rounded-lg bg-gray-200 min-h-[200px] ${
                  snapshot.isDraggingOver ? "bg-gray-300" : ""
                }`}
              >
                <h2 className="text-lg font-bold mb-2">{column.name}</h2>
                {tasks
                  .filter((task) => task.status === columnId)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskItem task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}