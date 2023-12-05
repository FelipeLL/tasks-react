import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { TaskModel } from "./interfaces/TaskModel";
import httpService from "./services/httpService";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getTasks = async () => {
    try {
      const { data } = await httpService.get<TaskModel[]>("/todo");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await httpService.delete(`/todo/${taskId}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (title: string) => {
    try {
      await httpService.post(`/todo`, { title });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id: string) => {
    try {
      await httpService.patch(`/todo/${id}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <header>
        <Navbar setShowModal={setShowModal} />
      </header>

      <main>
        <TaskList tasks={tasks} removeTask={removeTask} updateTask={updateTask} />

        {showModal && <AddTaskForm setShowModal={setShowModal} addTask={addTask} />}

        {!showModal && (
          <button
            className="fixed bottom-4 right-4 w-16 h-16 bg-red-500 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </main>
    </>
  );
}

export default App;
