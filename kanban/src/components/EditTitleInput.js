import React, { Fragment } from "react";
import { CheckIcon } from "@heroicons/react/outline";

function EditTitleInput({ id, handleNewTitle, title }) {
  return (
    <div className="flex">
      <label className="text-lg text-neutral-100 pr-3" htmlFor="title"></label>
      <input
        className="rounded-md px-2 accent-indigo-700 mt-1 mb-3"
        type="text"
        id="title"
        name="title"
        required
        minLength="4"
        maxLength="20"
        size="15"
        defaultValue={title}
        onKeyDown={handleNewTitle}
        id={id}
      ></input>
      <CheckIcon
        className="cursor-pointer text-neutral-400 w-6 mb-2 ml-3"
        onClick={handleNewTitle}
        id={id}
      />
    </div>
  );
}

export default EditTitleInput;
