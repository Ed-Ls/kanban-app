import "./App.css";
import { useEffect, useState, Fragment } from "react";
import List from "./components/List";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import ModalForm from "./components/ModalForm";

function App() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [showModal, setShowModal] = useState(false);

  const fetchLists = async () => {
    const response = await fetch("http://localhost:5000/lists");

    // generate error if unable to load data
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();

    const loadedLists = [];
    for (const key in responseData) {
      loadedLists.push({
        id: responseData[key].id,
        title: responseData[key].title,
        position: responseData[key].position,
        cards: responseData[key].cards,
      });
    }

    setLists(loadedLists);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLists().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    console.log(lists);
  }, []);

  const handleNewList = async (newEl) => {
    fetchLists();
    setShowModal(false);
  };

  const handleAddList = () => {
    setShowModal(true);
  };

  const kanban = lists.map((list) => (
    <List
      key={list.id}
      title={list.title}
      cards={list.cards.map((card) => card)}
    />
  ));

  const modalList = (
    <ModalForm
      element={"list"}
      modal={setShowModal}
      onAddedEl={handleNewList}
    />
  );

  return (
    <Fragment>
      {showModal && modalList}
      <h1 className="text-2xl font-bold text-center text-neutral-100 m-6">
        Kanban App
      </h1>
      <main className="flex flex-row h-[35rem] mx-2xl my-5 mx-2 bg-indigo-100 columns-3 gap-5 rounded-xl 5 p-2 overflow-scroll">
        {kanban}

        <div
          className="basis-1/4 flex-none m-5 bg-indigo-200 rounded-xl p-4 shadow-md h-[5rem] flex justify-center items-center cursor-pointer"
          onClick={handleAddList}
        >
          <PlusCircleIcon className="text-indigo-900/75 w-10" />
          <p className="font-bold text-indigo-900/75 text-center mx-8 text-xl">
            Ajouter une liste
          </p>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
