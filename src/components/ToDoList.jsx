import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./todo.css";
import {
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdAddCircle,
  MdCancel,
  MdSave
} from "react-icons/md";

export default function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Erreur chargement des tâches :", err);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await API.post("/todos", { title });
      setTitle("");
      setShowAddPopup(false);
      fetchTodos();
    } catch (err) {
      console.error("Erreur ajout :", err);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      await API.put(`/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error("Erreur changement état :", err);
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setShowEditPopup(true);
  };

  const saveEdit = async () => {
    try {
      await API.put(`/todos/${editId}`, { title: editTitle });
      setEditId(null);
      setEditTitle("");
      setShowEditPopup(false);
      fetchTodos();
    } catch (err) {
      console.error("Erreur modification :", err);
    }
  };

  return (
<div style={{ backgroundColor: "#fff5fb", height: "100vh", padding: "20px", marginTop: "-20px", marginRight: "-20px" }}>

      <h2>Ma To-Do List</h2>
      <button className="add-button" onClick={() => setShowAddPopup(true)}>
        <MdAddCircle size={20} /> Ajouter une tâche
      </button>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#aaa" : "#333",
              }}
            >
              {todo.title}
            </span>
            <div className="todo-actions">
              <button onClick={() => toggleCompleted(todo)}>
                {todo.completed ? (
                  <MdCancel size={20}  />
                ) : (
                  <MdCheckCircle size={20}  />
                )}
              </button>
              <button onClick={() => startEdit(todo)}>
                <MdEdit size={20}  />
              </button>
              <button
                onClick={() => {
                  setTodoToDelete(todo);
                  setShowDeletePopup(true);
                }}
              >
                <MdDelete size={20}  />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Popup ajout tâche */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Ajouter une nouvelle tâche 🌟</h3>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="popup-actions">
              <button onClick={addTodo}>
                Enregistrer
              </button>
              <button onClick={() => setShowAddPopup(false)}>
                 Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup édition tâche */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Modifier la tâche ✨</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="popup-actions">
              <button onClick={saveEdit}>
                 Sauvegarder
              </button>
              <button onClick={() => setShowEditPopup(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup suppression tâche */}
      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Supprimer cette tâche ?</h3>
            <p>« {todoToDelete?.title} » sera supprimée définitivement.</p>
            <div className="popup-actions">
              <button
                onClick={async () => {
                  try {
                    await API.delete(`/todos/${todoToDelete._id}`);
                    setShowDeletePopup(false);
                    setTodoToDelete(null);
                    fetchTodos();
                  } catch (err) {
                    console.error("Erreur suppression :", err);
                  }
                }}
              >
                Oui, supprimer
              </button>
              <button
                onClick={() => {
                  setShowDeletePopup(false);
                  setTodoToDelete(null);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
