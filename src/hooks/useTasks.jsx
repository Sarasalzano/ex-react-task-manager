import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${api}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("fetch error", error);
      });
  }, []);

  const addTask = () => {};
  const removeTask = () => {};
  const updateTasks = () => {};
  return { tasks, addTask, removeTask, updateTasks };
}
