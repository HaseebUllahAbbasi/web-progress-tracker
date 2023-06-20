import React, { useEffect, useState } from "react";
import "./Notes.css"; // Import the CSS file for styling
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER } from "../constant";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import './TodoList.css';
type NoteType = {
  _id?: string;
  user: string;
  heading: string;
  items: string[];
  color: string;
  createdAt: Date;
};

const Notes: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state: StateType) => state?.user);
  const socket = io(SERVER);

  const [isEditing, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<NoteType[]>([

  ])

  const fetchTodoUpdates = async () => {
    try {
      if (user) {
        const response = await axios.get<NoteType[]>(SERVER + '/api/notes/' + user?._id);
        setData(response.data);
      }
      else alert("User is not present")
    } catch (error) {
      console.error('Error fetching hourly updates:', error);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTodoUpdates();
    // Clean up the WebSocket connection
    socket.on("get-notes-user", (updatedData) => {
      setData(updatedData);
    });
    return () => {
      socket.disconnect();
    };
  }, []);



  const [title, setTitle] = useState("");


  const [selectedNote, setSelectedNote] = useState<string | undefined>("")
  const [desc, setDesc] = useState<string[]>([]);
  const [color, setColor] = useState<string>("#fffffa");

  function changeValue(value: string, index: number): void {
    const updatedDesc = [...desc];
    updatedDesc[index] = value;
    setDesc(updatedDesc);
  }


  const handleAddUpdate = async () => {
    const result = await axios
      .post(`${SERVER}/api/notes`, { userId: user?._id, heading: title, items: desc, color: color })
      .then((res) => res.data);
    if (result) {
      setDesc([""])
      setTitle("")
      setCreating(false);

      socket.emit("notes-user-update", { userId: user?._id });
      console.log(result);
      return result;
    }
  };

  const handleUpdate = async (noteId?: string) => {
    const result = await axios
      .put(`${SERVER}/api/notes/${noteId}`, { userId: user?._id, heading: title, items: desc, color: color })
      .then((res) => res.data);
    if (result) {
      setDesc([""])
      setTitle("")
      setCreating(false);
      setSelectedNote("")
      socket.emit("notes-user-update", { userId: user?._id });
      console.log(result);
      return result;
    }
  };

  const [creatingNewNote, setCreating] = useState<boolean>(false);

  return (
    <div className="container-custom">
      <h1 className="text-center">Notes App</h1>
      <div className="text-center">
        {!creatingNewNote && <button className="btn btn-warning" onClick={() => {

          if (title.length > 0 || desc.length > 0) {
            Swal.fire({
              title: 'Do you want to save the changes?',
              showCancelButton: true,
              confirmButtonText: "Don't Save",
              confirmButtonColor: "red"
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isDismissed) {
                return;
              } else if (result.isConfirmed) {
                setTitle('')
                setDesc([''])
                setColor("#ffff");
                setCreating(true)
                setEdit(false);


                Swal.fire('Previous Changes are discarded', '', 'info')
              }
            })
          }
          else {

            setCreating(true);
            setTitle("")
            setDesc([''])
            setColor('#fffffa')
            setEdit(false);
          }


        }} >Create New Note</button>}
      </div>

      {creatingNewNote && (
        <div
          className="new-note-container shadow-lg"
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
              if (title.length > 0 || desc.length > 0) {
                Swal.fire({
                  title: 'Do you want to save the changes?',
                  showCancelButton: true,
                  confirmButtonText: "Don't Save",
                  confirmButtonColor: "red"
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isDismissed) {
                    return;
                  } else if (result.isConfirmed) {
                    setTitle('')
                    setDesc([])
                    setColor("#ffff");
                    setCreating(false);
                    Swal.fire('Previous Changes are discarded', '', 'info')
                  }
                })
              }
              else {

                setCreating(false);
                setTitle("")
                setDesc([])
                setColor('#fffffa')
              }
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
                      onClick={async () => {
                        isEditing == true ? handleUpdate(selectedNote) : handleAddUpdate()
                      }}
                    >
                      {isEditing === true ? "Edit" : "Save"}
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
                style={{
                  fontSize: "30px",
                  color: noteItem.color,
                  filter: "invert(1)",
                }}
                onClick={() => {

                  if (title.length > 0 || desc.length > 0) {
                    Swal.fire({
                      title: 'Do you want to save the changes?',
                      showCancelButton: true,
                      confirmButtonText: "Don't Save",
                      confirmButtonColor: "red"
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isDismissed) {
                        return;
                      } else if (result.isConfirmed) {
                        setTitle(noteItem.heading)
                        setDesc(noteItem.items)
                        setColor(noteItem.color);
                        setCreating(true)
                        setEdit(true);
                        setSelectedNote(noteItem._id)
                        Swal.fire('Previous Changes are discarded', '', 'info')
                      }
                    })
                  }
                  else {

                    setTitle(noteItem.heading)
                    setDesc(noteItem.items)
                    setColor(noteItem.color);
                    setCreating(true)
                    setEdit(true);
                    setSelectedNote(noteItem._id)



                  }


                }}
              />
              <AiFillDelete
                title="Delete"

                style={{
                  fontSize: "30px",
                  color: noteItem.color,
                  filter: "invert(1)",

                }} onClick={async () => {

                  const response = await axios.delete(SERVER + '/api/notes/' + noteItem?._id);
                  if (response)
                    socket.emit("notes-user-update", { userId: user?._id });

                }} />

            </div>
            <div
              className="display-6 text-center my-1 mb-3"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: noteItem.color,
                filter: "invert(1)",
                textAlign: "center",
                marginTop: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              {noteItem.heading}
            </div>

            <ul >
              {noteItem.items.map((listItem: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, subIndex: React.Key | null | undefined) => (
                <li
                  key={subIndex}>

                  <span
                    style={{
                      color: noteItem.color,
                      filter: "invert(1)",
                    }}
                  >
                    - &nbsp;&nbsp;&nbsp;
                    {listItem}</span>

                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
