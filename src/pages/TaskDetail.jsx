import Context from "../contexts/Context";
import { useParams } from "react-router-dom";
import { useContext } from "react";

export default function TaskDetail() {
  const { id } = useParams(); // prendo l'id dalla URL
  const { tasks } = useContext(Context); // prendo l'array di tasks dal contesto

  const task = tasks.find((t) => t.id === id);
  if (!task) return "Task non trovato";

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.createdAt}</span>
      <button onClick={() => console.log("task eliminata")}>
        Elimina Task
      </button>
    </>
  );
}
