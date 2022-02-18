import React, { Fragment, useState } from "react";
import Label from "./Label";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import ModalForm from "./ModalForm";
import EditTitleInput from "./EditTitleInput";

function Card({ title, id, labels, onDeleteEl, position, getData }) {
  const [showModal, setShowModal] = useState(false);
  const [cardId, setCardId] = useState(0);
  const [editTitle, setEditTitle] = useState(false);

  const listLabels = labels.map((label) => (
    <Label
      key={label.id}
      labelId={label.id}
      labelTitle={label.title}
      labelColor={label.color}
      cardId={id}
      getData={getData}
    />
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

  //Update when clicking on the title
  const handleEditCard = (e) => {
    setEditTitle(true);
  };

  const handleNewTitle = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      let newTitle = e.currentTarget.value;
      let currId = +e.currentTarget.id;

      const response = await fetch(`http://localhost:5000/cards/${currId}`, {
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

  //Handle Modal & render new Label
  const handleAddLabel = (e) => {
    e.preventDefault();

    setCardId(+e.currentTarget.id);

    setShowModal(true);
  };

  const handleModal = () => {
    setShowModal(false);
    getData();
  };

  const modalLabel = (
    <ModalForm
      element={"label"}
      modal={setShowModal}
      onAddedEl={handleModal}
      cardId={id}
      numOfLabels={listLabels.length}
    />
  );

  return (
    <Fragment>
      {showModal && modalLabel}
      <div
        className={`basis-1/4 m-3 bg-neutral-200 rounded-xl p-2 shadow-md shadow-indigo-400/50 py-6 my-6 relative order-${position}`}
      >
        <TrashIcon
          className="cursor-pointer text-rose-900 w-6 absolute top-6 right-6"
          onClick={handleDeleteCard}
          id={id}
        />
        {editTitle && editTitleInp}
        {!editTitle && (
          <h2
            className="text-l font-bold mx-2 mb-5 text-left"
            onClick={handleEditCard}
            id={id}
          >
            {title}
          </h2>
        )}
        <div className="flex flex-wrap">
          {listLabels}
          <PlusCircleIcon
            className="text-black-900 w-6 mx-3 cursor-pointer"
            onClick={handleAddLabel}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Card;
