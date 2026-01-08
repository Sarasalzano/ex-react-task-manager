import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ id, title, status, createdAt }) {
  let colore;
  if (status === "To do") {
    colore = "red";
  } else if (status === "Doing") {
    colore = "yellow";
  } else if (status === "Done") {
    colore = "green";
  }

  return (
    <tr>
      <td>
        <Link to={`/task/${id}`}>{title}</Link>
      </td>
      <td style={{ backgroundColor: colore }}>{status}</td>
      <td>{createdAt}</td>
    </tr>
  );
}

export default React.memo(TaskRow);
