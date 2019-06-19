import React, { useEffect, useCallback, useState } from "react";
import "./App.css";

const arrayInitial = [1, 2, 3, 4, 5, 6];

const style = {
  listStyle: "none",
  border: "1px solid gray",
  marginBottom: "5px"
};

function App() {
  const [list, setList] = useState(arrayInitial);
  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart =  (e,index) => {
      setDraggedItem(list[index]);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };


  const onDragOver = index => {
    const draggedOverItem = list[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = list.filter(item => item !== draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);

    setList(items);
  };

  const onDragEnd = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <main>
          <h3>List of items</h3>
          <ul>
            {list.map((item, idx) => (
              <li style={style} key={item} onDragOver={() => onDragOver(idx)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => onDragStart(e, idx)}
                  onDragEnd={onDragEnd}
                >
                  {item}
                </div>
              </li>
            ))}
          </ul>
        </main>
      </header>
    </div>
  );
}

export default App;
