import { renderHook, act } from "@testing-library/react";
import { useTasks } from "../useTasks";
import { describe, test, expect, beforeEach } from "@jest/globals";

function setup(names: string[] = []) {
  const { result } = renderHook(() => useTasks());
  act(() => {
    names.forEach((name) => result.current.addTask(name));
  });
  return result;
}

beforeEach(() => {
  localStorage.clear();
});

describe("useTask addTask", () => {
  test("Adding task to list", () => {
    const result = setup(["Add task"]);
    expect(result.current.taskList.length).toBe(1);
  });

  test("Not adding empty task", () => {
    const result = setup(["   "]);
    expect(result.current.taskList.length).toBe(0);
  });

  test("Trim task name", () => {
    const result = setup([" Task 3  "]);
    expect(result.current.taskList[0].name).toBe("Task 3");
  });
});

describe("useTask deleteTask", () => {
  test("Deleting task from a list", () => {
    const result = setup(["Task 1", "Task 2"]);
    const taskId = result.current.taskList[0].key;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.taskList).toHaveLength(1);
    expect(result.current.taskList[0].name).toBe("Task 2");
  });
});

describe("useTask edit task", () => {
  test("Edit task", () => {
    const result = setup(["Task 4", "Task 5", "Task 6"]);
    const firstTaskId = result.current.taskList[0].key;
    const secondTaskId = result.current.taskList[1].key;
    const thirdTaskId = result.current.taskList[2].key;

    act(() => {
      result.current.editTask(firstTaskId, "4 Task");
      result.current.editTask(secondTaskId, "  ");
      result.current.editTask(thirdTaskId, "");
    });

    expect(result.current.taskList).toHaveLength(3);
    expect(result.current.taskList[0].name).toBe("4 Task");
    expect(result.current.taskList[1].name).toBe("Task 5");
    expect(result.current.taskList[2].name).toBe("Task 6");
  });
});

describe("useTask toggle task status", () => {
  test("Toggling task status to complete and uncomplete", () => {
    const result = setup(["Task 7", "Task 8"]);
    const taskId = result.current.taskList[0].key;

    act(() => {
      result.current.toggleTaskStatus(taskId);
    });

    expect(result.current.taskList[0].completed).toBe(true);
    expect(result.current.taskList[1].completed).toBe(false);

    act(() => {
      result.current.toggleTaskStatus(taskId);
    });

    expect(result.current.taskList[0].completed).toBe(false);
    expect(result.current.taskList[1].completed).toBe(false);
  });
});