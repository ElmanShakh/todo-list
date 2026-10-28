export type Task = {
  key: string;
  name: string;
  completed: boolean;
};

export type TaskListProps = {
  taskList: Task[];
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newName: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  reorderTaskDragEnd: (newOrder: Task[]) => void;
};

export type TaskItemProps = {
  name: string;
  taskId: string;
  completed: boolean;
  index: number;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newName: string) => void;
  toggleTaskStatus: (taskId: string) => void;
};

export type Theme = "light" | "dark" | "system";