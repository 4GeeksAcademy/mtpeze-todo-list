import React, { useState } from "react";
import { TodoList } from "./TodoList";
import Login from "./Login";

const Home = () => {
  const [loged, setLoged] = useState(false);
  const [user, setUser] = useState("");

  return (
    <>
      {!loged ? (
        <Login setLoged={setLoged} setUser={setUser} />
      ) : (
        <>
          <header className="bg-dark text-white py-3">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">📝 Todo-list con fetch mtpezedev</h5>
                <div>
                  <span className="me-3">👤 {user}</span>
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => {
                      setLoged(false);
                      setUser("");
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main id="tasks" className="container-fluid">
            <TodoList setLoged={setLoged} user={user} setUser={setUser} />
          </main>
          <footer className="text-center py-3 mt-5 text-muted">
            <p>© 2025 Company, Inc</p>
          </footer>
        </>
      )}
    </>
  );
};

export default Home;
