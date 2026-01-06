import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import NavBar from "./components/Navbar";
import { ListProvider } from "./contexts/Context";

function App() {
  return (
    <>
      <ListProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/addtask" element={<AddTask />} />
          </Routes>
        </BrowserRouter>
      </ListProvider>
    </>
  );
}

export default App;
