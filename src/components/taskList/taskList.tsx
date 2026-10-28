import { isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { TaskItem } from "../taskItem/taskItem";
import type { Task, TaskListProps } from "../../types/types";
import "./taskList.css";
//+

export function TaskList({
  taskList,
  deleteTask,
  editTask,
  toggleTaskStatus,
  reorderTaskDragEnd,
}: TaskListProps) {
  function getStats(): string {
    const completions = taskList.filter((t) => t.completed).length;
    const numOfTasks = taskList.length;
    if (numOfTasks === 0) {
      return `Add your first task 📝`;
    } else if (completions === 0) {
      return `You have ${numOfTasks} task${numOfTasks > 1 ? "s" : ""} 🚀`;
    } else if (numOfTasks === completions) {
      return "All tasks done 🎉";
    } else {
      return `${completions} of ${numOfTasks} done 🔥`;
    }
  }

  function sortByCompletion(a: Task, b: Task): number {
    if (!a.completed && b.completed) {
      return -1;
    }
    if (a.completed && !b.completed) {
      return 1;
    }
    return 0;
  }

  const sortedTasks: Task[] = [...taskList].sort(sortByCompletion);

  function handleDragEnd(event: DragEndEvent): void {
    if (event.canceled) return;
    const { source } = event.operation;
    if (isSortable(source)) {
      const { initialIndex, index } = source;
      if (initialIndex !== index) {
        const newOrder = [...sortedTasks];
        const [moved] = newOrder.splice(initialIndex, 1);
        newOrder.splice(index, 0, moved);
        reorderTaskDragEnd(newOrder);
      }
    }
  }

  return (
    <div className="tasks">
      <DragDropProvider onDragEnd={handleDragEnd}>
        {sortedTasks.map((task, index) => (
          <TaskItem
            key={task.key}
            name={task.name}
            completed={task.completed}
            deleteTask={deleteTask}
            taskId={task.key}
            editTask={editTask}
            toggleTaskStatus={toggleTaskStatus}
            index={index}
          />
        ))}
      </DragDropProvider>
      <p className="todo-stats">{getStats()}</p>
    </div>
  );
}
