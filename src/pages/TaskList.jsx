import { useContext } from "react";
import Context from "../contexts/Context";

export default function TaskList() {
  const { tasks } = useContext(Context);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Stato</th>
          <th>Data di Creazione</th>
        </tr>
      </thead>
    </table>
  );
}
