import React from "react";

export default function TaskItem({ task }) {
  return (
    <div className="p-2 mb-2 bg-white rounded shadow cursor-pointer">
      {task.content}
    </div>
  );
}