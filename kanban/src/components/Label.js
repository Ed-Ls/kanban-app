import React from "react";

function Label({ labelTitle, labelColor, labelId, getData, cardId }) {
  const handleDeleteLabel = async (e) => {
    e.preventDefault();

    if (e.detail === 2) {
      const id = +e.currentTarget.id;

      const response = await fetch(
        `http://localhost:5000/cards/${cardId}/label/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      getData();
    }
  };

  const colorClass =
    labelColor === "yellow"
      ? `text-xs font-italic m-1 text-left bg-yellow-500 px-4 py-2 rounded-3xl`
      : labelColor === "green"
      ? `text-xs font-italic m-1 text-left bg-green-500 px-4 py-2 rounded-3xl`
      : labelColor === "blue"
      ? `text-xs font-italic m-1 text-left bg-blue-500 px-4 py-2 rounded-3xl`
      : `text-xs font-italic m-1 text-left bg-red-500 px-4 py-2 rounded-3xl`;

  return (
    <span onClick={handleDeleteLabel} className={colorClass} id={labelId}>
      {labelTitle}
    </span>
  );
}

export default Label;
