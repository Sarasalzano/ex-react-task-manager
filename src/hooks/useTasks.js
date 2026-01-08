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

  const removeTask = async (id) => {
    try {
      const res = await fetch(`${api}/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        // rimuovo il task dallo stato globale
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log("Task eliminata");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Errore fetch", error);
    }
  };

const updateTask = async (updatedTask) => {
  try {
    const res = await fetch(`${api}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    // Aggiorno lo stato globale sostituendo il task aggiornato
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === data.task.id ? data.task : task
      )
    );

    console.log("Task aggiornata:", data.task);
  } catch (error) {
    console.error("Errore aggiornamento task:", error);
    throw error; // così chi chiama updateTask può mostrare alert o modale
  }
};


  return { tasks, addTask, removeTask, updateTask };
}
