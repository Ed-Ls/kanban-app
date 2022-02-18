import React, { Fragment, useState } from "react";
import Card from "./Card";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import ModalForm from "./ModalForm";
import EditTitleInput from "./EditTitleInput";

function List({ title, id, position, cards, onDeleteEl, getData }) {
  const [showModal, setShowModal] = useState(false);
  const [listId, setListId] = useState(0);
  const [editTitle, setEditTitle] = useState(false);

  const listCards = cards.map((card) => (
    <Card
      key={card.id}
      id={card.id}
      position={card.position}
      title={card.title}
      labels={card.labels.map((label) => label)}
      onDeleteEl={onDeleteEl}
      getData={getData}
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

  //Update when clicking on the title
  const handleEditList = (e) => {
    setEditTitle(true);
  };

  const handleNewTitle = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      let newTitle = e.currentTarget.value;
      let currId = e.currentTarget.id;

      console.log(currId);

      const response = await fetch(`http://localhost:5000/lists/${currId}`, {
        method: "PATCH",
        body: JSON.stringify({ title: newTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      getData();

      setEditTitle(false);
    }
  };

  const editTitleInp = (
    <EditTitleInput id={id} handleNewTitle={handleNewTitle} title={title} />
  );

  //Handle Modal & render new Card
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
      numOfCards={listCards.length}
    />
  );

  return (
    <Fragment>
      {showModal && modalCard}
      <div
        className={`basis-1/4 flex-none m-5 bg-indigo-700 rounded-xl p-4 py-6 shadow-md overflow-y-auto relative order-${position}`}
      >
        <TrashIcon
          className="cursor-pointer text-rose-700 w-8 absolute top-6 right-6"
          onClick={handleDeleteList}
          id={id}
        />
        {editTitle && editTitleInp}
        {!editTitle && (
          <h2
            className="text-xl font-bold mb-4 ml-4 text-left text-neutral-100"
            onClick={handleEditList}
            id={id}
          >
            {title}
          </h2>
        )}
        {listCards}

        <div
          id={id}
          className="basis-1/4 flex-none m-3 bg-indigo-600 rounded-xl p-2 shadow-md h-[3rem] flex justify-center items-center cursor-pointer"
          onClick={handleAddCard}
        >
          <PlusCircleIcon className="text-indigo-900 w-8" />
          <p className="text-indigo-900 text-center mx-8 text-xl">
            Add a New Card
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default List;
