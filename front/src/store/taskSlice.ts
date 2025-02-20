import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store/store";

// Definimos el tipo de Task
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  dueDate: string | null;
  createdAt: string;
}

// Estado inicial
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Crear el slice de las tareas
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Cuando la acción de eliminación está pendiente (en proceso)
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      // Cuando la tarea se elimina correctamente
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== Number(action.payload)
        );
        state.loading = false;
      })
      // Cuando la eliminación falla
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = "Failed to delete task";
        state.loading = false;
      });
  },
});

export const { setTasks, setLoading, setError, updateTask } = taskSlice.actions;

// Acción para agregar una nueva tarea
export const addTask =
  (newTask: Partial<Task>) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        newTask
      );
      dispatch(setTasks(response.data));
    } catch (error: any) {
      dispatch(setError("Failed to add task"));
    }
  };

// Acción para obtener las tareas
export const fetchTasks = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:3000/api/tasks");
    dispatch(setTasks(response.data));
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError("Failed to fetch tasks"));
    dispatch(setLoading(false));
  }
};

// Acción para editar una tarea
export const editTask =
  (updatedTask: Partial<Task> & { id: number }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { id, ...taskData } = updatedTask;

      const response = await axios.put(
        `http://localhost:3000/api/tasks/${id}`,
        taskData
      );

      dispatch(updateTask(response.data));
    } catch (error: any) {
      dispatch(setError("Failed to update task"));
    }
  };

// Acción para eliminar una tarea
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
    return taskId; // El ID de la tarea eliminada se pasa al payload
  }
);

export default taskSlice.reducer;
