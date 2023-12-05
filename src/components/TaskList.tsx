import { TaskCard } from "./TaskCard";
import { TaskModel } from "../interfaces/TaskModel";
import { Alert } from "./Alert";

interface Props {
  tasks: TaskModel[];
  removeTask: (taskId: string) => void;
  updateTask: (id: string) => Promise<void>;
}

export const TaskList: React.FC<Props> = ({ tasks, removeTask, updateTask }) => {
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} removeTask={removeTask} updateTask={updateTask} />
        ))}
      </ul>
      {tasks.length === 0 && <Alert />}
    </>
  );
};
