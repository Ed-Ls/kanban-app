import { useRef, useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import Label from "./Label";

function ModalForm({
  element,
  modal,
  onAddedEl,
  numOfLists,
  numOfCards,
  numOfLabels,
  listId,
  cardId,
}) {
  const titleRef = useRef("");
  const [changeRadio, setChangeRadio] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [labels, setLabels] = useState([]);

  const addElementtoDB = async (e) => {
    e.preventDefault();

    let elementType = element;

    const getListPosition = numOfLists++;
    const getCardPosition = numOfCards++;

    let newEl;

    elementType === "card"
      ? (newEl = {
          title: titleRef.current.value,
          position: getCardPosition,
          list_id: listId,
        })
      : (newEl = {
          title: titleRef.current.value,
          position: getListPosition,
        });

    const response = await fetch(`http://localhost:5000/${element}s`, {
      method: "POST",
      body: JSON.stringify(newEl),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    onAddedEl();
  };

  //Specific part for labels (specific form handling + specific requests to DB - fetch labels & link label to card)
  const fetchLabels = async () => {
    const response = await fetch("http://localhost:5000/labels");

    // generate error if unable to load data
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();

    const loadedLabels = [];
    for (const key in responseData) {
      loadedLabels.push({
        id: responseData[key].id,
        title: responseData[key].title,
        color: responseData[key].color,
      });
    }
    setLabels(loadedLabels);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLabels().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const addLabelToCard = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/cards/${cardId}/label/${changeRadio}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    onAddedEl();
  };

  const checkRadio = (id) => {
    return id === changeRadio;
  };

  const listLabels =
    labels &&
    labels.map((label) => (
      <div
        key={label.id}
        className="flex flex-col items-center justify-around h-[4rem]"
      >
        <label htmlFor="label">
          <Label
            key={label.id}
            labelTitle={label.title}
            labelColor={label.color}
            checked={checkRadio(label.id)}
            onChange={() => setChangeRadio(+label.id)}
          />
        </label>
        <input
          type="radio"
          name="label"
          className="form-radio accent-indigo-700"
          checked={checkRadio(label.id)}
          onChange={() => setChangeRadio(+label.id)}
          id={label.id}
        ></input>
      </div>
    ));

  return (
    <div className="flex flex-col items-center justify-center min-h-1/3 bg-indigo-800 w-5/12 mx-auto rounded-xl fixed top-40 left-0 right-0 rounded-xl shadow-3xl py-10 z-10 ">
      <h3 className="text-2xl font-bold text-center text-neutral-100 mb-8 relative">
        Add a new {element}
      </h3>
      <XCircleIcon
        className="cursor-pointer text-neutral-100 w-10 absolute top-3 right-3"
        onClick={() => modal(false)}
      />

      {/* form for card & list is the same */}
      {element !== "label" && (
        <form className="flex flex-col" onSubmit={addElementtoDB}>
          <div className="flex">
            <label className="text-lg text-neutral-100 pr-8" htmlFor="title">
              Title
            </label>
            <input
              className="rounded-md px-2 accent-indigo-700"
              type="text"
              id="title"
              name="title"
              required
              minLength="4"
              maxLength="20"
              size="15"
              ref={titleRef}
            ></input>
          </div>

          <button
            className="bg-neutral-100 mt-12 py-2 rounded-xl cursor-pointer font-bold"
            type="submit"
          >
            Add {element}
          </button>
        </form>
      )}

      {/* specific form for labels */}
      {element === "label" && (
        <form className="flex flex-col" onSubmit={addLabelToCard}>
          <div className="flex w-[20rem] justify-around">{listLabels}</div>

          <button
            className="bg-neutral-100 mt-12 py-2 rounded-xl cursor-pointer font-bold"
            type="submit"
          >
            Add {element}
          </button>
        </form>
      )}
    </div>
  );
}

export default ModalForm;
