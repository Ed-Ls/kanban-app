import React from "react";
import Card from "./Card";

function List({ title, cards }) {
  const listCards = cards.map((card) => (
    <Card
      key={card.id}
      title={card.title}
      color={card.color}
      labels={card.labels.map((label) => label)}
    />
  ));

  return (
    <div className="basis-1/4 flex-none m-5 bg-indigo-700 rounded-xl p-4 shadow-md overflow-y-auto">
      <h2 className="text-xl font-bold m-4 text-left text-neutral-100">
        {title}
      </h2>
      {listCards}
    </div>
  );
}

export default List;
