import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${api}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("fetch error", error);
      });
  }, []);

  const addTask = async (task) => {
    const res = await fetch(`${api}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    setTasks((prev) => [...prev, data.task]);
  };

  const removeTask = () => {};
  const updateTasks = () => {};

  return { tasks, addTask, removeTask, updateTasks };
}
