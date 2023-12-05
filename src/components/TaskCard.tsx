import { TaskModel } from "../interfaces/TaskModel";
import { useState } from "react";

interface Props {
  task: TaskModel;
  removeTask: (taskId: string) => void;
  updateTask: (id: string) => Promise<void>;
}

export const TaskCard: React.FC<Props> = ({ task, removeTask, updateTask }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggle = async () => {
    setIsLoading(true);
    await updateTask(task.id);
    setIsLoading(false);
  };

  return (
    <li className="w-full flex">
      <div
        className={`h-auto w-20 flex-none bg-cover rounded-l text-center overflow-hidden bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] ${
          task.done ? "from-green-400 to-green-600" : "from-red-400 to-red-600"
        }`}
      ></div>
      <div className="border-r border-b w-full border-l-0 border-t border-gray-400 bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={task.done}
                onClick={toggle}
                disabled={isLoading}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <p className="text-sm text-gray-600 flex items-center">Completada</p>
            </div>
            <div>
              <img src={task.done ? "/smile.svg" : "/sad.svg"} alt="emoji" className="w-8 h-8 text-red-300" />
            </div>
          </div>

          <div className="text-gray-900 font-bold text-md mb-2">{task.title}</div>
        </div>
        <div>
          <div className="flex justify-end">
            <button
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
              onClick={() => removeTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
