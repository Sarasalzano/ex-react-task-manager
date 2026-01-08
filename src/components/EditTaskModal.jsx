import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");

  const formRef = useRef();

  // quando cambia il task, riempio il form
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description,
      status,
    };

    onSave(updatedTask);
  };

  return (
    <Modal
      show={show}
      title="Modifica Task"
      confirmText="Salva"
      onClose={onClose}
      onConfirm={() => formRef.current.requestSubmit()}
      content={
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </form>
      }
    />
  );
}
