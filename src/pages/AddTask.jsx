import { useRef, useState } from "react";

export default function AddTask({ addTask }) {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    //Validazioni
    if (!title || !descriptionRef.current.value || !statusRef.current.value) {
      alert("Compila tutti i campi");
      return;
    }

    if (
      [...title].some((char) => symbols.includes(char)) ||
      [...descriptionRef.current.value].some((char) => symbols.includes(char))
    ) {
      alert("Sono presenti caratteri vietati");
      return;
    }

    //Creo l'oggetto task
    const task = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    //Chiamo addTask con try/catch
    try {
      await addTask(task); // aspetta la fetch
      alert("Task creata con successo");

      //Reset del form
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (error) {
      alert(`Errore nella creazione del task: ${error.message}`);
    }

    console.log(task);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <textarea ref={descriptionRef}></textarea>
      </label>

      <label>
        Status
        <select ref={statusRef}>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </label>

      <button type="submit">Aggiungi Task</button>
    </form>
  );
}
