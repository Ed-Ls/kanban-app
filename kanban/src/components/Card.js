import React from "react";
import Label from "./Label";

function Card({ title, color, labels }) {
  console.log(labels);

  const listLabels = labels.map((label) => (
    <Label key={label.id} labelTitle={label.title} labelColor={label.color} />
  ));

  return (
    <div
      className={`basis-1/4 m-3 bg-neutral-200 rounded-xl p-2 shadow-md shadow-indigo-400/50 py-6 my-6`}
    >
      <h2 className="text-l font-bold mx-2 mb-5 text-left">{title}</h2>
      {listLabels}
    </div>
  );
}

export default Card;
