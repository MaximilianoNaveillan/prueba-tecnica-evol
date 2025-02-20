import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { fetchTasks, editTask, deleteTask } from "../store/taskSlice";
import { Task } from "../store/taskSlice"; // Asegúrate de importar el tipo Task

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (filter === "completados") return task.completed;
        if (filter === "pendientes") return !task.completed;
        return true;
      })
    : [];

  const handleEditClick = (task: Task) => {
    setEditingTask({ ...task }); // Copia toda la tarea para editar
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      dispatch(editTask(editingTask as Task)); // Usar editTask en vez de updateTask
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("¿Seguro que quieres eliminar esta tarea?")) {
      dispatch(deleteTask(taskId));
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Tareas
      </h1>
      <div className="flex justify-end mb-4">
        <Link to="/new-task" className="px-4 py-2 ">
          + Nueva Tarea
        </Link>
      </div>

      {/* Filtro */}
      <div className="flex justify-center gap-x-2 mb-4">
        {["todos", "completados", "pendientes"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de tareas */}
      <ul className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            >
              {editingTask?.id === task.id ? (
                // Formulario de edición
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingTask?.title || ""}
                    onChange={(e) =>
                      setEditingTask((prev) => ({
                        ...prev, // Si `prev` es null, usar un objeto vacío
                        title: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />

                  <textarea
                    value={editingTask?.description || ""}
                    onChange={(e) =>
                      setEditingTask((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />
                  {/* Puedes agregar otros campos si es necesario */}
                  <div className="flex justify-end gap-x-2">
                    <button
                      onClick={handleUpdateTask}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Vista normal de la tarea
                <>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                  <p
                    className={`mt-2 font-medium ${
                      task.completed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          dispatch(
                            editTask({ ...task, completed: !task.completed })
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span
                        className={`font-medium ${
                          task.completed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {task.completed ? "Completado" : "Pendiente"}
                      </span>
                    </label>
                  </p>
                  <div className="flex gap-x-2 justify-end">
                    <button
                      onClick={() => handleDeleteTask(task.id.toString())} // Convierte el id a string
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Editar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
