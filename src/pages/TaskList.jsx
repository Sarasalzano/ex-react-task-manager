import { useContext, useState, useMemo, useRef, useCallback } from "react";
import Context from "../contexts/Context";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(Context);

  //Ordinamento
  const [sortBy, setSortBy] = useState("createdAt"); // default colonna
  const [sortOrder, setSortOrder] = useState(1); // 1 = crescente, -1 = decrescente

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1); // inverti l'ordine se stessa colonna
    } else {
      setSortBy(column);
      setSortOrder(1); // nuova column = crescente
    }
  };

  //Debounce
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef(null);

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 500);
  }, []);

  //Filtra e ordina task
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    //Filtro per titolo 
    if (searchQuery) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ordinamento
    result.sort((a, b) => {
      let compare = 0;

      if (sortBy === "title") {
        compare = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const order = { "To do": 0, Doing: 1, Done: 2 };
        compare = order[a.status] - order[b.status];
      } else if (sortBy === "createdAt") {
        compare =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return compare * sortOrder;
    });

    return result;
  }, [tasks, searchQuery, sortBy, sortOrder]);

  return (
    <>
      {/* input ricerca non controllato per debounce */}
      <input
        type="text"
        placeholder="Cerca task..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Nome</th>
            <th onClick={() => handleSort("status")}>Stato</th>
            <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
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
    </>
  );
}
