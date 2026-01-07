import { createContext, useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();

export function ListProvider({ children }) {
  const { tasks, addTask, removeTask, updateTasks } = useTasks();

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
