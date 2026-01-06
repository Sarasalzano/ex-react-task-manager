import { createContext, useEffect, useState } from "react";
const api = import.meta.env.VITE_API_URL;

const TaskContext = createContext();

export function ListProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`${api}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
