import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import NewTask from "./pages/NewTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/new-task" element={<NewTask />} />
      </Routes>
    </Router>
  );
}

export default App;
