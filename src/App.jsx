import React, { useState } from "react"; // 1. CORRIGÉ : Ajout de { useState }

export default function App() {
  // Etape 1: Initialiser le state pour les tâches dans un tableau vide
  const [task, setTask] = useState([]);

  // Etape 2: Créer un state pour la nouvelle tâche et un state pour l'ouverture du modal
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Etape 3: Les fonctions
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: Date.now(),
      name: newTask,
      completed: false,
    };

    setTask([...task, newTaskObj]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    const updatedTasks = task.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTask(updatedTasks);

    // Vérifier si toutes les tâches sont complétées et ouvrir le modal si c'est le cas
    const allDone = updatedTasks.every((t) => t.completed);
    if (allDone && updatedTasks.length > 0) {
      setIsModalOpen(true);
    }
  };

  const deleteTask = (id) => {
    setTask(task.filter((t) => t.id !== id));
  };

  const editTask = (id, newName) => {
    const updatedTasks = task.map((t) => {
      if (t.id === id) {
        return { ...t, name: newName };
      }
      return t;
    });
    setTask(updatedTasks);
  };

  //Afficher Date et Heure sur l'ecran pour l'user
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 3. Ce qui s'affiche à l'écran
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ma To-Do List</h1>
      <p style={styles.currentTime}>{currentTime.toLocaleString()}</p>

      <form onSubmit={addTask} style={styles.form}>
        <input
          type="text"
          placeholder="Ajouter une tâche importante..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>
          Ajouter
        </button>
      </form>


      {/* Liste des tâches */}
      <div style={styles.list}>
        {task.length === 0 ? (
          <p style={{ color: "#888" }}>Aucune tâche !</p>
        ) : (
          task.map((t) => (
            <div key={t.id} style={styles.taskItem}>
              {/* Zone cliquable : regroupe le rond + le texte à gauche */}
              <div
                onClick={() => toggleTask(t.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                {/* LE ROND EN CSS */}
                <span
                  style={{
                    ...styles.circle,
                    backgroundColor: t.completed ? "#4CAF50" : "transparent", // Vert si coché, vide sinon
                    borderColor: t.completed ? "#4CAF50" : "#ccc", // Bordure verte si coché, grise sinon
                  }}
                >
                  {t.completed && "✓"}{" "}
                  {/* Affiche une petite coche blanche si la tâche est faite */}
                </span>

                {/* LE TEXTE DE LA TÂCHE */}
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "#888" : "#000",
                  }}
                >
                  {t.name}
                </span>
              </div>

              {/* BOUTON SUPPRIMER */}
              <button onClick={() => deleteTask(t.id)} style={styles.deleteBtn}>
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>

      {/* --- NOTRE FENÊTRE MODALE --- */}
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Productivité Maximale ! 🏆</h2>
            <p>
              Félicitations, tu as terminé toutes tes tâches ! Tu gères grave.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={styles.closeBtn}
            >
              Quitter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  // Styles pour l'affichage de la date et de l'heure
  currentTime: {
    margin: "10px 0",
    textAlign: "center",
    color: "#1d89e1",
    marginBottom: "20px",
    font: "600 18px 'Segoe UI', sans-serif",
  },

  container: {
    fontFamily: "Segoe UI, sans-serif",
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", color: "#333" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "white",
    borderRadius: "6px",
    borderLeft: "5px solid #2196F3",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  taskText: { cursor: "pointer", flex: 1, fontSize: "16px" },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    maxWidth: "400px",
  },
  closeBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
