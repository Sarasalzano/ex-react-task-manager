import React from "react";

function TaskRow({ title, status, createdAt }) {
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
      <td>{title}</td>
      <td style={{ backgroundColor: colore }}>{status}</td>
      <td>{createdAt}</td>
    </tr>
  );
}

export default React.memo(TaskRow);
