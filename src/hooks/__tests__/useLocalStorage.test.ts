import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";
import { describe, test, expect, beforeEach } from "@jest/globals";

const storageMock = [
  { key: "1", name: "Task 1", completed: false },
  { key: "2", name: "Task 2", completed: true },
  { key: "3", name: "Task 3", completed: true },
];

describe("Use LocalStorage tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("When localStorage is empty returns no value", () => {
    const { result } = renderHook(() => useLocalStorage("key", []));
    expect(result.current[0]).toEqual([]);
  });

  test("Saves value to localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof storageMock>("key", []),
    );
    act(() => {
      result.current[1](storageMock);
    });
    expect(JSON.parse(localStorage.getItem("key")!)).toEqual(storageMock);
  });

  test("Reads saved value from localStorage", () => {
    localStorage.setItem("key", JSON.stringify(storageMock));
    const { result } = renderHook(() => useLocalStorage("key", []));
    expect(result.current[0]).toHaveLength(3);
    expect(result.current[0][0]).toEqual(storageMock[0]);
  });

  test("Deletes a value from localStorage", () => {
    localStorage.setItem("key", JSON.stringify(storageMock));
    localStorage.removeItem("key");
    const { result } = renderHook(() => useLocalStorage("key", []));
    expect(result.current[0]).toEqual([]);
  });
});