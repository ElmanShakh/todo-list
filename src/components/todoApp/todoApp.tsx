import React, { useState } from "react";
import { TaskList } from "../taskList/taskList";
import { useTasks } from "../../hooks/useTasks";
import "./todoApp.css";

export function TodoApp() {
  const [task, setTask] = useState("");
  const {
    taskList,
    addTask,
    deleteTask,
    editTask,
    toggleTaskStatus,
    reorderTaskDragEnd,
  } = useTasks();

  const today: string = new Date().toLocaleDateString();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setTask(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task);
    setTask("");
  }

  return (
    <div className="todo">
      <h1 className="todo-title">My Tasks:</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-form_input"
          placeholder="Type your task here..."
          value={task}
          onChange={handleInput}
        />
        <button aria-label="Add task" className="todo-form_btn">
          + ADD
        </button>
      </form>
      <p className="todo-form_date">{today}</p>

      <TaskList
        taskList={taskList}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleTaskStatus={toggleTaskStatus}
        reorderTaskDragEnd={reorderTaskDragEnd}
      />
    </div>
  );
}
