import { useRef, useState } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    if (!title || !descriptionRef.current.value || !statusRef.current.value) {
      console.error("compila tutti i campi");
      return;
    }
    console.log("dati inviati");

    if (
      [...title].some((char) => symbols.includes(char)) ||
      [...descriptionRef.current.value].some((char) => symbols.includes(char))
    ) {
      console.error("Sono presenti caratteri vietati");
    }
    console.log("Ok, niente simboli");

    const task = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    console.log(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea ref={descriptionRef}></textarea>
      <select ref={statusRef}>
        <option value="To do">To do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Aggiungi Task</button>
    </form>
  );
}
