import React, { useState } from "react";
import EditTodo from "./EditTodo";
import "./ToDo.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const [editId, setEditId] = useState(null);
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState({
    text: "",
    description: "",
    status: "Pending",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((curinput) => {
      return {
        ...curinput,
        [name]: value,
      };
    });
  };

  const handleAdd = () => {
    const newTodo = {
      ...input,
      _id: Date.now().toString(),
    };
    console.log(newTodo);
    setTodo([...todo, newTodo]);
    setInput({
      text: "",
      description: "",
      status: "Pending",
    });
    setEditId(false);
  };

  const updateToDo = (_id, updatedData) => {
    setTodo((prevTodos) =>
      prevTodos.map((task) =>
        task._id === _id ? { ...task, ...updatedData } : task
      )
    );
  };

  const handleEdit = (todo) => {
    setEditId(todo);
  };

  const handleSaveEdit = (id, obj) => {
    updateToDo(id, obj);
    setEditId(null);
  };

  const handleDelete = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  return (
    <div className="main">
      <div className="top-bar">
        <Link to="/loginpage" className="login-link">
          Login
        </Link>
      </div>
      <div className="container">
        <h1>To-do App</h1>
        <div className="cont-inp">
          <input
            name="text"
            type="text"
            value={input.text}
            onChange={handleChange}
            placeholder="Enter a task"
          />
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            placeholder="Description"
            rows="1"
          />
        </div>
        <div className="cont-add">
          <select name="status" value={input.status} onChange={handleChange}>
            <option value="Pendig">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={() => handleAdd()}>Add</button>
        </div>
      </div>
      <ul className="list">
        {todo?.map((todo, index) => (
          <li key={index}>
            <div className="todos">
              <div className="todo">
                <strong className="text">{todo.text}</strong>-{" "}
                <em className="status">{todo.status}</em>
                <div className="desc">{todo.description}</div>
              </div>
              <div className="btn">
                <button className="btn-update" onClick={() => handleEdit(todo)}>Update</button>
                <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        {editId && (
          <EditTodo
            todo={editId}
            onClose={() => setEditId(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
