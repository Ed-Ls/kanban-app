import "./App.css";
import { useEffect, useState, Fragment } from "react";
import List from "./components/List";

function App() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
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

    fetchLists().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    console.log(lists);
  }, []);

  const kanban = lists.map((list) => (
    <List
      key={list.id}
      title={list.title}
      cards={list.cards.map((card) => card)}
    />
  ));

  return (
    <Fragment>
      <h1 className="text-2xl font-bold text-center text-indigo-900 m-5">
        Kanban App
      </h1>
      <main className="flex flex-row flex-nowrap h-[35rem] mx-2xl my-5 mx-2 bg-indigo-700/50 columns-3 gap-8 rounded">
        {kanban}
      </main>
    </Fragment>
  );
}

export default App;
