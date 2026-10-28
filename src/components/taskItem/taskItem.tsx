import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import type { TaskItemProps } from "../../types/types";
import "./taskItem.css";

export function TaskItem({
  name,
  taskId,
  completed,
  index,
  deleteTask,
  editTask,
  toggleTaskStatus,
}: TaskItemProps) {
  const { ref } = useSortable({ id: taskId, index, disabled: completed });

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    editTask(taskId, newName);
    setNewName("");
    setEditing(false);
  }

  const viewTemplate = (
    <div className="task-item_content">
      <span
        className={`task-item_title ${completed ? "task-item_title-completed" : ""}`}
      >
        {name}
      </span>
      <button
        aria-label="Edit"
        className="task-item_edit_btn"
        onClick={() => {
          setNewName(name);
          setEditing(true);
        }}
      >
        ✏️
      </button>
      <button
        aria-label="Delete"
        className="task-item_del_btn"
        onClick={() => deleteTask(taskId)}
      >
        🗑️
      </button>
    </div>
  );

  const editTemplate = (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        className="task-item_edit"
        onChange={handleChange}
        type="text"
        value={newName}
      />
      <button
        aria-label="Submit"
        className="task-item_btn task-item_submit_btn"
      >
        ✅
      </button>
      <button
        aria-label="Cancel edit"
        className="task-item_btn task-item_edit_btn"
        type="button"
        onClick={() => setEditing(false)}
      >
        🚫
      </button>
    </form>
  );

  return (
    <div className="task-item" ref={ref}>
      <button
        aria-checked={completed}
        aria-label={`Complete task ${name}`}
        role="checkbox"
        className={
          completed ? "task-item_checkbox-active" : "task-item_checkbox"
        }
        onClick={() => toggleTaskStatus(taskId)}
      />
      {isEditing ? editTemplate : viewTemplate}
    </div>
  );
}
