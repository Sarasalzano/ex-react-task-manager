import { useContext } from "react";
import Context from "../contexts/Context";
import TaskRow from "../components/TaskRow";

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
      <tbody>
        {tasks.map((task) => {
          return (
            <TaskRow
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              createdAt={task.createdAt}
            />
          );
        })}
      </tbody>
    </table>
  );
}
