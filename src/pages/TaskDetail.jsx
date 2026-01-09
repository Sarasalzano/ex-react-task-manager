import Context from "../contexts/Context";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams(); // prendo l'id dalla URL
  const { tasks, removeTask, updateTask } = useContext(Context); // aggiunto removeTask

  const task = tasks.find((t) => t.id.toString() === id);

  if (!task) return "Task non trovato";

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeTask(id); // elimina il task dal contesto
      setShowModal(false); // chiude la modale
    } catch (error) {
      alert(`Errore durante l'eliminazione: ${error.message}`);
      setShowModal(false);
    }
  };

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.createdAt}</span>
      <button onClick={handleDeleteClick}>Elimina Task</button>
      <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

      <Modal
        show={showModal}
        title="Conferma eliminazione"
        content="Sei sicura di voler eliminare questo task?"
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <EditTaskModal
        show={showEditModal}
        task={task}
        onClose={() => setShowEditModal(false)}
        onSave={async (updatedTask) => {
          try {
            await updateTask(updatedTask);
            alert("Task modificata con successo");
            setShowEditModal(false);
          } catch (error) {
            alert(error.message);
          }
        }}
      />
    </>
  );
}
