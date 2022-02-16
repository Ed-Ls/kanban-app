import React, { Fragment, useState } from "react";
import Card from "./Card";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import ModalForm from "./ModalForm";

function List({ title, id, position, cards, onDeleteEl, getData }) {
  const [showModal, setShowModal] = useState(false);
  const [listId, setListId] = useState(0);

  const listCards = cards.map((card) => (
    <Card
      key={card.id}
      id={card.id}
      title={card.title}
      color={card.color}
      labels={card.labels.map((label) => label)}
      onDeleteEl={onDeleteEl}
    />
  ));

  //Delete a list on click
  const handleDeleteList = async (e) => {
    e.preventDefault();

    const id = +e.currentTarget.id;

    const response = await fetch(`http://localhost:5000/lists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    onDeleteEl();
  };

  const handleAddCard = (e) => {
    e.preventDefault();

    setListId(+e.currentTarget.id);

    setShowModal(true);
  };

  const handleModal = () => {
    setShowModal(false);
    getData();
  };

  const modalCard = (
    <ModalForm
      element={"card"}
      modal={setShowModal}
      onAddedEl={handleModal}
      numOfEl={listCards.length}
      listId={listId}
    />
  );

  return (
    <Fragment>
      {showModal && modalCard}
      <div
        className={`basis-1/4 flex-none m-5 bg-indigo-700 rounded-xl p-4 shadow-md overflow-y-auto relative order-${position}`}
      >
        <TrashIcon
          className="cursor-pointer text-rose-600 w-8 absolute top-6 right-6"
          onClick={handleDeleteList}
          id={id}
        />
        <h2 className="text-xl font-bold m-4 text-left text-neutral-100">
          {title}
        </h2>
        {listCards}

        <div
          id={id}
          className="basis-1/4 flex-none m-3 bg-indigo-600 rounded-xl p-2 shadow-md h-[3rem] flex justify-center items-center cursor-pointer"
          onClick={handleAddCard}
        >
          <PlusCircleIcon className="text-indigo-900 w-8" />
          <p className="text-indigo-900 text-center mx-8 text-xl">
            Ajouter une carte
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default List;
