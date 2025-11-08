import React, { useState } from "react";

export const TodoList = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const value = text.trim();
      if (value.length === 0) return;
      setTodos((prev) => [...prev, value]);
      setText("");
    }
  };

  const handleDelete = (indexToRemove) => {
    setTodos((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    // esto no es CSS OK ESTO ES INLINE UN POQUITO DE STYLE
    <div className="container py-5" style={{ maxWidth: 680 }}>
      <h1 className="display-1 text-center text-muted">
        Agrega tus tareas flojo, abusador.
      </h1>

      <input
        type="text"
        className="form-control form-control-lg mb-2"
        placeholder="Qué tienes que hacer hoy? O ma;ana.. o nunca?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <ul className="list-group shadow-sm">
        {todos.length === 0 ? (
          <li className="list-group-item text-muted">
            No hay tareas, añadir tareas
          </li>
        ) : (
          todos.map((task, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center todo-item"
            >
              <span className="py-2">{task}</span>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary btn-delete"
                aria-label={`Eliminar ${task}`}
                onClick={() => handleDelete(idx)}
              >
                &times;
              </button>
            </li>
          ))
        )}
      </ul>
      {/*  Aquí me excedí de fantástico con detectar si tiene una tarea o no para agregar la S JAJAJAJAJA aceptenlo B) */}

      <div className="text-muted small mt-2">
        {todos.length} Tarea{todos.length !== 1 ? "s" : ""} pendientes
      </div>
    </div>
  );
};

export default TodoList;
