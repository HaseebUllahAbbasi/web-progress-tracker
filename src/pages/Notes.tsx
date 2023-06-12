import React, { useState } from "react";
import "./Notes.css"; // Import the CSS file for styling
import { FaBeer, FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'


const Notes: React.FunctionComponent = () => {
  const [data, setData] = useState([
    {
      user: "user1",
      heading: "Todo List 1",
      items: ["Item 1", "Item 2", "Item 3"],
      color: "#fa00af",
      createdAt: new Date(),
    },
    {
      user: "user2",
      heading: "Todo List 2",
      items: ["Item A", "Item B", "Item C"],
      color: '#ffaaaf',
      createdAt: new Date(),
    },
    {
      user: "user1",
      heading: "Todo List 3",
      items: ["Task 1", "Task 2", "Task 3"],
      color: "#ffffaf",
      createdAt: new Date(),
    },
  ])

  const [title, setTitle] = useState("");

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

        {!creatingNewNote && <button className="btn btn-warning" onClick={() => {
          setCreating(true);
          setDesc([''])
          setColor('#fffffa')
        }} >Create New Note</button>}
      </div>

      {creatingNewNote && (
        <div
          className="new-note-container"
          style={{ backgroundColor: color }}
        >
          <div className="d-flex">
            <input
              type="color"
              className="form-control form-control-color mx-3"
              id="favcolor"
              name="favcolor"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button className="btn btn-danger" onClick={() => {
              setCreating(false);
              setDesc([])
              setColor('fffffa')
            }} >Discard</button>

          </div>
          <input
            className="form-control w-25 mx-3 my-3"
            type="text"
            value={title}
            name={'title'}
            placeholder="title"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />

          <div className="text-center px-5 my-3">
            {desc.map((item, index) => (
              <div className="d-flex align-items-center" key={index}>
                <span className="mx-3">{index + 1}.</span>
                <input
                  className="form-control w-25 my-1"
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
                      className="btn "
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
                  <button className="btn"
                    title="remove Item"
                    onClick={() => {
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
            <div className="d-flex">
              <FaEdit
                title="Edit"
                style={{ fontSize: "30px" }}
                onClick={() => {
                  setTitle(noteItem.heading)
                  setDesc(noteItem.items)
                  setColor(noteItem.color);
                  setCreating(true)

                }}
              />
              <AiFillDelete
                title="Delete"

                style={{ fontSize: "30px" }} onClick={() => {
                  const newArray = [...data];
                  newArray.splice(index, 1);
                  setData([...newArray])

                }} />

            </div>
            <div className="display-6 text-center my-1 mb-3" style={{ fontSize: "20px", fontWeight: "bolder" }}>
              {noteItem.heading}
            </div>
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
