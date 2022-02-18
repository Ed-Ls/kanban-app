import React from "react";
import { CursorClickIcon } from "@heroicons/react/outline";

function Header() {
  return (
    <header>
      <h1 className="text-2xl font-bold text-center text-neutral-100 m-6">
        Kanban App
      </h1>
      <div className="bg-indigo-100 w-[20rem] rounded-xl p-2 m-4 text-indigo-900">
        <div className="flex">
          <CursorClickIcon className="text-indigo-900/75 w-6 mx-4" />
          <div className="text-sm">
            <p>Double click on labels to delete</p>
            <p>Click on titles to edit</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
