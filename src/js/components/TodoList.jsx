import React, { useEffect, useState } from "react";

export const TodoList = (props) => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const host = "https://playground.4geeks.com/todo";
  const user = props.user;

  const apiRequest = async (endpoint, metodo, body = null) => {
    const uri = `${host}${endpoint}`;
    const options = {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    };

    const response = await fetch(uri, options);

    if (response.status === 404) {
      props.setLoged(false);
      props.setUser("");
      alert("Usuario no encontrado :(");
      return;
    }

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText);
      return;
    }

    if (metodo === "GET" && response.ok) {
      return await response.json();
    }

    getTasks();
  };

  const getElementById = async (id) => {
    const data = await apiRequest(`/users/${user}`, "GET");
    if (data && data.todos) {
      for (const element of data.todos) {
        if (element.id === id) return element;
      }
    }
  };

  const getTasks = async () => {
    const data = await apiRequest(`/users/${user}`, "GET");
    if (data && data.todos) {
      setTasks(data.todos);
    }
  };

  const addTask = async (taskContent) => {
    apiRequest(`/todos/${user}`, "POST", {
      label: taskContent,
      is_done: false,
    });
    setText("");
  };

  const deleteTask = async (id) => {
    apiRequest(`/todos/${id}`, "DELETE");
  };

  const editTask = async (elementToEdit) => {
    apiRequest(`/todos/${elementToEdit.id}`, "PUT", elementToEdit);
    setEditingElement(null);
    setIsEdit(false);
    setText("");
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const taskContent = text.trim();
    if (taskContent === "") {
      alert("No puede añadir una tarea en blanco");
      return;
    }

    if (isEdit) {
      editTask({ ...editingElement, label: text });
    } else {
      addTask(taskContent);
    }
  };

  const handleEdit = async (id) => {
    const element = await getElementById(id);
    setEditingElement(element);
    setIsEdit(true);
    setText(element.label);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditingElement(null);
    setText("");
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleToggleComplete = async (id) => {
    const element = await getElementById(id);
    if (element) {
      editTask({ ...element, is_done: !element.is_done });
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 680 }}>
      <h1 className="display-1 text-center text-muted">
        Agrega tus tareas flojo, abusador.
      </h1>

      <div className="mb-2">
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            placeholder={
              isEdit
                ? "Editando tarea..."
                : "Qué tienes que hacer hoy? O ma;ana.. o nunca?"
            }
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`btn ${isEdit ? "btn-dark" : "btn-primary"}`}
            onClick={handleSubmit}
          >
            {isEdit ? "💾 Guardar" : "➕ Agregar"}
          </button>
          {isEdit && (
            <button className="btn btn-secondary" onClick={handleCancel}>
              ❌ Cancelar
            </button>
          )}
        </div>

        {isEdit && editingElement && (
          <div className="form-check mt-2 ms-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="completedCheck"
              checked={editingElement.is_done}
              onChange={() =>
                setEditingElement({
                  ...editingElement,
                  is_done: !editingElement.is_done,
                })
              }
            />
            <label className="form-check-label" htmlFor="completedCheck">
              Marcar como completada
            </label>
          </div>
        )}
      </div>

      <ul className="list-group shadow-sm">
        {tasks.length === 0 ? (
          <li className="list-group-item text-muted">
            No hay tareas, añadir tareas
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center todo-item ${
                task.is_done ? "bg-light" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-2 flex-grow-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={task.is_done}
                  onChange={() => handleToggleComplete(task.id)}
                  style={{ cursor: "pointer" }}
                />
                <span
                  className="py-2"
                  style={{
                    textDecoration: task.is_done ? "line-through" : "none",
                    color: task.is_done ? "#6c757d" : "#000",
                  }}
                >
                  {task.label}
                </span>
              </div>

              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => handleEdit(task.id)}
                  title="Editar tarea"
                >
                  ✏️
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary btn-delete"
                  onClick={() => handleDelete(task.id)}
                  title="Eliminar tarea"
                >
                  &times;
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="text-muted small mt-2">
        {tasks.length} Tarea{tasks.length !== 1 ? "s" : ""} en total |{" "}
        <strong>
          {tasks.filter((t) => !t.is_done).length} pendiente
          {tasks.filter((t) => !t.is_done).length !== 1 ? "s" : ""}
        </strong>
      </div>
    </div>
  );
};

export default TodoList;
