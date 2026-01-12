import { useContext, useState, useMemo } from "react";
import Context from "../contexts/Context";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(Context);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * sortOrder;
      } else if (sortBy === "status") {
        const order = { "To do": 0, "Doing": 1, "Done": 2 };
        return (order[a.status] - order[b.status]) * sortOrder;
      } else if (sortBy === "createdAt") {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
      }
      return 0;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("title")}>Nome</th>
          <th onClick={() => handleSort("status")}>Stato</th>
          <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.map((task) => (
          <TaskRow
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            createdAt={task.createdAt}
          />
        ))}
      </tbody>
    </table>
  );
}
