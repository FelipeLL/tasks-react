import { useState } from "react";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: (title: string) => Promise<void>;
}

export const AddTaskForm: React.FC<Props> = ({ setShowModal, addTask }) => {
  const [title, setTitle] = useState("");

  const handleAddTask = async () => {
    if (title.trim() === "") {
      return;
    }

    addTask(title);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div
      v-show="true"
      className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
    >
      <div className="w-96 p-6 bg-white rounded-md shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">Agregar tarea</h3>
          <svg
            onClick={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <form className="pt-4 mb-7" action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">
              Título
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Título de la tarea"
              required
            />
          </div>
        </form>
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-6 py-2 text-gray-700 border border-gray-600 rounded font-medium">
            Cancelar
          </button>
          <button
            className="px-6 py-2 ml-2 text-white font-medium bg-green-500 hover:bg-green-600 rounded"
            onClick={handleAddTask}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
