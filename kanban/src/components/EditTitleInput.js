import React, { Fragment } from "react";

function EditTitleInput({ id, handleNewTitle, title }) {
  return (
    <Fragment>
      <label className="text-lg text-neutral-100 pr-8" htmlFor="title"></label>
      <input
        className="rounded-md px-2 accent-indigo-700 mt-3"
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
    </Fragment>
  );
}

export default EditTitleInput;
