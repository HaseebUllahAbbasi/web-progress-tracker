import React, { useState } from "react";
import "./Notes.css"; // Import the CSS file for styling

const Notes: React.FunctionComponent = () => {
  const data = [
    {
      user: "user1",
      heading: "Todo List 1",
      items: ["Item 1", "Item 2", "Item 3"],
      color: "blue",
      createdAt: new Date(),
    },
    {
      user: "user2",
      heading: "Todo List 2",
      items: ["Item A", "Item B", "Item C"],
      color: "green",
      createdAt: new Date(),
    },
    {
      user: "user1",
      heading: "Todo List 3",
      items: ["Task 1", "Task 2", "Task 3"],
      color: "yellow",
      createdAt: new Date(),
    },
  ];
  const [desc, setDesc] = useState([""]);
  const [color, setColor] = useState<string>("#fffffa");

  function changeValue(value: string, index: number): void {
    const updatedDesc = [...desc];
    updatedDesc[index] = value;
    setDesc(updatedDesc);
  }

  const handleAddUpdate = async () => {
    console.log("handle");
  };

  const [creatingNewNote, setCreating] = useState<boolean>(false);

  return (
    <>
      <h1 className="text-center">Notes App</h1>
      <div className="text-center">
        <button className="btn btn-warning" onClick={() => setCreating(true)} >Create New Note</button>
      </div>
      {creatingNewNote && (
        <div
          className="new-note-container"
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            className="form-control form-control-color"
            id="favcolor"
            name="favcolor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <div className="text-center px-5 my-3">
            {desc.map((item, index) => (
              <div className="d-flex align-items-center" key={index}>
                <span className="mx-3">{index + 1}.</span>
                <input
                  className="form-control w-25"
                  type="text"
                  value={item}
                  name={`${index}`}
                  onChange={(e) => {
                    changeValue(e.target.value, index);
                  }}
                />
                {index + 1 === desc.length ? (
                  <div className="mx-3 d-flex justify-content-around">
                    <button
                      className="btn btn-warning"
                      title="Add new Item"
                      onClick={() => setDesc([...desc, ""])}
                    >
                      ➕
                    </button>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={handleAddUpdate}
                    >
                      Save Note
                    </button>
                  </div>
                ) : <div>
                  <button className="btn" onClick={() => {
                    const newArray = [...desc];
                    newArray.splice(index, 1)
                    setDesc([...newArray])


                  }} > ➖</button>
                </div>}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="d-flex flex-wrap">
        {data.map((noteItem, index) => (
          <div
            className="note-container"
            key={index}
            style={{ backgroundColor: noteItem.color }}
          >
            <ul>
              {noteItem.items.map((listItem: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, subIndex: React.Key | null | undefined) => (
                <li key={subIndex}>{listItem}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
