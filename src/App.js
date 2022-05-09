import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [taskUpdate, setTaskUpdate] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const findSameTask = tasks.find((item) => item.name === task);

    if (findSameTask) {
      return alert(`A tarefa ${findSameTask?.name} já existe!`);
    }

    if (!task) {
      return alert("Por favor, digite o nome da tarefa.");
    }

    if (tasks.length === 0) {
      setTasks([{ id: 1, name: task }]);
      setTask("");
    } else {
      setTasks((prevState) => {
        const newTask = {
          id: prevState.length + 1,
          name: task,
        };

        return [...prevState, newTask];
      });
      setTask("");
    }
  }

  function handleDeleteTask(id) {
    const filterTasks = tasks.filter((item) => item.id !== id);
    setTasks(filterTasks);
  }

  function handleUpdateTask(id, name) {
    const findIndexTask = tasks.findIndex((item) => item.id === id);
    tasks[findIndexTask].name = name;
  }

  function toggleEditable(id, status) {
    const findIndexTask = tasks.findIndex((item) => item.id === id);
    tasks[findIndexTask].isUpdate = !status;
    setTasks((prevState) => [...prevState]);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>TO-DO</h1>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", width: "600px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "50px",
          }}
        >
          <label style={{ fontSize: "20px", fontWeight: "bold" }}>Tarefa</label>
          <div style={{ display: "flex", marginTop: "15px" }}>
            <input
              name="task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
              style={{ width: "300px" }}
              placeholder="Digite a tarefa"
            />
            <button
              type="submit"
              style={{
                width: "60px",
                padding: "5px",
                marginLeft: "10px",
                border: "0.5px solid green",
                background: "transparent",
                color: "green",
                fontWeight: "bold",
                fontSize: "18px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Criar
            </button>
          </div>
        </div>
      </form>
      <div style={{ maxWidth: "800px", width: "100%" }}>
        {tasks.length > 0
          ? tasks.map((task) => {
              if (task.isUpdate) {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                      marginBottom: "20px",
                      background: "#fff",
                      borderLeft: "10px solid blue",
                      borderBottom: "1px solid #222",
                      height: "65px",
                    }}
                    key={task.id}
                  >
                    <input
                      defaultValue={task.name}
                      onChange={(e) => setTaskUpdate(e.target.value)}
                      style={{ height: "20px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateTask(task.id, taskUpdate);
                          toggleEditable(task.id, task.isUpdate);
                        }}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          cursor: "pointer",
                          fontWeight: "bold",
                          height: "15px",
                          width: "15px",
                        }}
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleEditable(task.id, task.isUpdate)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    marginBottom: "10px",
                    borderLeft: "10px solid green",
                    borderBottom: "1px solid #222",
                  }}
                  key={task.id}
                >
                  <h2>{task.name}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        fontWeight: "bold",
                        height: "15px",
                        width: "15px",
                        marginLeft: "25px",
                      }}
                    >
                      X
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleEditable(task.id, task.isUpdate)}
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              );
            })
          : "Nenhuma tarefa"}
      </div>
    </div>
  );
}

export default App;
