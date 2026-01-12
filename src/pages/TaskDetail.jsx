import Context from "../contexts/Context";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams(); // id preso dalla URL (stringa)
  const taskId = Number(id); // converto in numero per confrontarlo con task.id
  const { tasks, removeTask, updateTask } = useContext(Context);

  // cerco il task corretto
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return "Task non trovato";

  const [showModal, setShowModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false); 

  //Modale eliminazione
  const handleDeleteClick = () => setShowModal(true);

  //Conferma eliminazione
  const handleConfirmDelete = async () => {
    try {
      await removeTask(taskId); 
      setShowModal(false);
      alert("Task eliminata con successo");
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

      {/* Conferma eliminazione */}
      <Modal
        show={showModal}
        title="Conferma eliminazione"
        content="Sei sicura di voler eliminare questo task?"
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Modifica task */}
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
