import type { Task } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
  const [taskList, setTaskList] = useLocalStorage<Task[]>("tasks", []);

  function addTask(taskName: string) {
    const trimTaskName = taskName.trim();
    if (!trimTaskName) return;
    setTaskList((prev) => [
      ...prev,
      {
        key: crypto.randomUUID(),
        name: trimTaskName,
        completed: false,
      },
    ]);
  }

  function deleteTask(taskId: string) {
    setTaskList((curr) => curr.filter((t) => t.key !== taskId));
  }

  function editTask(taskId: string, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setTaskList((curr) =>
      curr.map((task) =>
        task.key === taskId ? { ...task, name: trimmed } : task,
      ),
    );
  }

  function toggleTaskStatus(taskId: string) {
    setTaskList((curr) =>
      curr.map((task) => {
        if (task.key === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  }

  function reorderTaskDragEnd(newOrder: Task[]) {
    setTaskList(newOrder);
  }

  return {
    taskList,
    addTask,
    deleteTask,
    editTask,
    toggleTaskStatus,
    reorderTaskDragEnd,
  };
}
