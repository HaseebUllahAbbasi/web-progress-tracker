import React, { useEffect, useState } from 'react';
import './TodoList.css';
import { AiFillDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { SERVER } from '../constant';
import axios from 'axios';

interface TodoUpdate {
  _id: string;
  user: string,
  completed: boolean,
  createdAt: Date,
  title: string,
  animate?: boolean;
}



const Todo: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: StateType) => state?.user);
  const socket = io(SERVER);

  // const [todoUpdates, setTodoUpdates] = useState<TodoUpdate[]>([]);

  const [todoUpdates, setTodoUpdates] = useState<TodoUpdate[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (!user?._id)
      navigate('/')
    fetchTodoUpdates();

    // socket.emit("todo-user-update", { userId: user?._id })
    socket.on('get-todo-user', (updatedData: [TodoUpdate]) => {
      setTodoUpdates(updatedData);
    });



    // Clean up the WebSocket connection
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleAddUpdate = async () => {
    try {
      const response = await axios.post(SERVER + '/api/todo', {
        title: newTodo, user: user?._id
      });

      socket.emit('todo-data-update', { userId: user?._id });
    } catch (error) {
      console.error('Error adding hourly update:', error);
    }
  }

  const fetchTodoUpdates = async () => {
    try {
      if (user) {
        const response = await axios.get<TodoUpdate[]>(SERVER + '/api/todo/' + user?._id);
        setTodoUpdates(response.data);
      }
      else alert("User is not present")
    } catch (error) {
      console.error('Error fetching hourly updates:', error);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {

      // setTodos([...todos, newTodoItem]);
      setNewTodo('');
      handleAddUpdate();


    }
  };

  const handleToggleComplete = async (id: string, status: boolean) => {

    const response = await axios.put(SERVER + '/api/todo/' + id, {
      status: !status
    });

    socket.emit('todo-data-update', { userId: user?._id });


  };

  return (
    <div className="container-custom">
      <h2>Todo List
      </h2>
      <div>
        {
          JSON.stringify(user)
        }
      </div>
      <div className="todo-input">

        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className='form-control'
        />
        <button onClick={handleAddTodo} className='btn btn-warning' >Add</button>
      </div>
      <div>
        <h4>Incomplete Tasks</h4>
        {todoUpdates
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div
              key={todo._id}
              className={`todo-item ${todo.animate ? 'animate' : ''}`}
              onAnimationEnd={() => {
                // setTodos((prevTodos) =>
                //   prevTodos.map((t) => {
                //     if (t.id === todo.id) {
                //       return { ...t, animate: false };
                //     }
                //     return t;
                //   })
                // );
              }}
            >
              <AiFillDelete style={{ fontSize: "20px" }} onClick={() => {
                const newTodo = todoUpdates.filter(item => item._id !== todo._id)
                setTodoUpdates(newTodo)
              }} />

              <input
                type="checkbox"
                className='form-check-input'
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo._id, todo.completed)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            </div>
          ))}
      </div>
      <div>
        <h4>Completed Tasks</h4>
        {todoUpdates
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div

              key={todo._id}
              className={`${todo.animate ? 'animate shadow-lg my-1 todo-item' : 'shadow-lg my-1'}`}
              style={{ borderRadius: "10px", padding: "10px" }}
              onAnimationEnd={() => {
                // setTodos((prevTodos) =>
                //   prevTodos.map((t) => {
                //     if (t.id === todo.id) {
                //       return { ...t, animate: false };
                //     }
                //     return t;
                //   })
                // );
              }}
            >
              <AiFillDelete style={{ fontSize: "20px" }} onClick={() => {
                const newTodo = todoUpdates.filter(item => item._id !== todo._id)
                setTodoUpdates(newTodo)
              }} />


              <input
                type="checkbox"
                className='form-check-input'
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo._id, todo.completed)}
              />
              <span className="completed">{todo.title}</span>

            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
