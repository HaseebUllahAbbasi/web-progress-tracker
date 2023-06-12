import React, { useState } from 'react';
import './TodoList.css';
import { AiFillDelete } from 'react-icons/ai'

interface TodoType {
  id: number;
  text: string;
  completed: boolean;
  animate: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: TodoType = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        animate: true,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setTimeout(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo.id === newTodoItem.id) {
              return { ...todo, animate: false };
            }
            return todo;
          })
        );
      }, 500);
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed, animate: true };
        }
        return todo;
      })
    );
    setTimeout(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, animate: false };
          }
          return todo;
        })
      );
    }, 500);
  };

  return (
    <div className="container-custom">
      <h2>Todo List</h2>
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
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.animate ? 'animate' : ''}`}
              onAnimationEnd={() => {
                setTodos((prevTodos) =>
                  prevTodos.map((t) => {
                    if (t.id === todo.id) {
                      return { ...t, animate: false };
                    }
                    return t;
                  })
                );
              }}
            >
              <AiFillDelete style={{ fontSize: "20px" }} onClick={() => {
                const newTodo = todos.filter(item => item.id !== todo.id)
                setTodos(newTodo)
              }} />

              <input
                type="checkbox"
                className='form-check-input'
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            </div>
          ))}
      </div>
      <div>
        <h4>Completed Tasks</h4>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div

              key={todo.id}
              className={`${todo.animate ? 'animate shadow-lg my-1 todo-item' : 'shadow-lg my-1'}`}
              style={{ borderRadius: "10px", padding: "10px" }}
              onAnimationEnd={() => {
                setTodos((prevTodos) =>
                  prevTodos.map((t) => {
                    if (t.id === todo.id) {
                      return { ...t, animate: false };
                    }
                    return t;
                  })
                );
              }}
            >
              <AiFillDelete style={{ fontSize: "20px" }} onClick={() => {
                const newTodo = todos.filter(item => item.id !== todo.id)
                setTodos(newTodo)
              }} />


              <input
                type="checkbox"
                className='form-check-input'
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              <span className="completed">{todo.text}</span>

            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
