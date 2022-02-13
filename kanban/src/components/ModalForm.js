import { useRef } from "react";
import { XCircleIcon } from "@heroicons/react/outline";

function ModalForm({ element, modal, onAddedEl }) {
  const titleRef = useRef("");

  const addElementtoDB = async (e) => {
    e.preventDefault();

    const newEl = {
      title: titleRef.current.value,
    };

    const response = await fetch("http://localhost:5000/lists", {
      method: "POST",
      body: JSON.stringify(newEl),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    onAddedEl(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-1/3 bg-indigo-800 w-5/12 mx-auto rounded fixed top-40 left-0 right-0 rounded-xl shadow-3xl py-10 ">
      <h3 className="text-2xl font-bold text-center text-neutral-100 mb-8 relative">
        Add a new {element}
      </h3>
      <XCircleIcon
        className="cursor-pointer text-neutral-100 w-10 absolute top-3 right-3"
        onClick={() => modal(false)}
      />

      <form className="flex flex-col" onSubmit={addElementtoDB}>
        <div className="flex">
          <label className="text-lg text-neutral-100 pr-8" htmlFor="title">
            Title
          </label>
          <input
            className="rounded-md"
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
    </div>
  );
}

export default ModalForm;
