import React from "react";
import Label from "./Label";
import { TrashIcon } from "@heroicons/react/outline";

function Card({ title, id, color, labels, onDeleteEl }) {
  // console.log(labels);

  const listLabels = labels.map((label) => (
    <Label key={label.id} labelTitle={label.title} labelColor={label.color} />
  ));

  //Delete a card on click
  const handleDeleteCard = async (e) => {
    e.preventDefault();

    const id = +e.currentTarget.id;

    const response = await fetch(`http://localhost:5000/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    onDeleteEl();
  };

  return (
    <div
      className={`basis-1/4 m-3 bg-neutral-200 rounded-xl p-2 shadow-md shadow-indigo-400/50 py-6 my-6 relative`}
    >
      <TrashIcon
        className="cursor-pointer text-rose-900 w-6 absolute top-6 right-6 z-10"
        onClick={handleDeleteCard}
        id={id}
      />
      <h2 className="text-l font-bold mx-2 mb-5 text-left">{title}</h2>
      {listLabels}
    </div>
  );
}

export default Card;
