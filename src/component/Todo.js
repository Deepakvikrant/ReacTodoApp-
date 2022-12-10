import React, { useState, useEffect } from "react";
import "./Style.css";

const getLocalStoredData = () => {
  const list = localStorage.getItem("myTodoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState(" ");
  const [items, setItems] = useState(getLocalStoredData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggoleButton, settoggoleButton] = useState(false);

  //add items function
  const addItems = () => {
    if (!inputData) {
      alert("Plese add something");
    }
    //this else if for edit button
    else if (inputData && toggoleButton) {
      setItems(
        items.map((curElement) => {
          if (curElement.id === isEditItem) {
            return { ...curElement, name: inputData };
          }
          return curElement;
        })
      );
      setInputData("");
      setIsEditItem(null);
      settoggoleButton(false);

    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //delete  function
  const deleteItem = (clickedId) => {
    const updatedData = items.filter((curElement) => {
      return curElement.id !== clickedId;
    });
    setItems(updatedData);
  };

  //edit function
  const editItem = (clickedId) => {
    const itemTodoEdited = items.find((curElement) => {
      return curElement.id === clickedId;
    });
    setInputData(itemTodoEdited.name);
    setIsEditItem(clickedId);
    settoggoleButton(true);
  };

  //remove all
  const removeAll = () => {
    setItems([]);
  };

  //adding local Stroge
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="totologo" />
            <figcaption>Add Yor List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="ADD ITEMS"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggoleButton ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-6 px-6 rounded-full m-6"
                onClick={addItems}
              >
                Change
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-6 px-6 rounded-full m-6"
                onClick={addItems}
              >
                ADD
              </button>
            )}

            
          </div>

          {/* Show items */}
          <div className="showItems">
            {items.map((curElement, index) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-btn">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-3 px-3 rounded-full m-3"
                      onClick={() => editItem(curElement.id)}
                    >
                      e
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-3 px-3 rounded-full m-3"
                      onClick={() => deleteItem(curElement.id)}
                    >
                      d
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
