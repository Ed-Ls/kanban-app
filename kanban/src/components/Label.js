import React from "react";

function Label({ labelTitle, labelColor }) {
  const colorClass =
    labelColor === "yellow"
      ? `text-xs font-italic mx-2 text-left bg-yellow-500 px-4 py-2 rounded-3xl`
      : `text-xs font-italic mx-2 text-left bg-red-500 px-4 py-2 rounded-3xl`;

  return <span className={colorClass}>{labelTitle}</span>;
}

export default Label;
