import { useContext } from "react";
import { TaskContext } from "../../../shared/context/task-context";
import { useApiClient } from "../../../shared/hooks/api-hook";
import UpdateTask from "./updateTask";

const TaskTable = ({ tasks }) => {
  const { sendRequest } = useApiClient();
  const taskContext = useContext(TaskContext);

  const handleDelete = async (id) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
        }
      );

      if (response) {
        taskContext.getTasks();
      }
    } catch (error) {}
  };

  const handleStatusUpdate = async (id) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/tasks/${id}/status`,
        "PATCH"
      );

      if (response?.data?.task) {
        taskContext.getTasks();
      }
    } catch (error) {}
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="text-center"> No task found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap">
      {tasks.map((task) => (
        <div class="max-w-sm  lg:w-72 ml-2 mt-2  relative p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-1 text-sm font-semibold truncate w-40 tracking-tight text-gray-900 dark:text-white">
            {task?.title}
          </h5>

          <p class="mb-2 text-xs font-normal truncate w-60 text-gray-500 dark:text-gray-400">
            {task?.description}
          </p>
          <div className="absolute top-2 right-4">
            {!task?.completionStatus && (
              <div class="inline-flex items-center ">
                <UpdateTask task={task} />
              </div>
            )}
            <div
              onClick={() => handleDelete(task?._id)}
              className="inline-flex text-xs items-center text-red-400 hover:underline ml-2 cursor-pointer"
            >
              Delete
            </div>
          </div>
          <div className="flex justify-between">
            <div class="inline-flex text-xs items-center text-gray-300 hover:underline">
              {task?.dueDate}
            </div>
            <div className="flex items-center">
              <span class="mr-1 text-xs font-medium text-gray-500 dark:text-gray-300">
                {task?.completionStatus ? (
                  <span className="text-green-500">Done </span>
                ) : (
                  <span className="text-slate-500">Pending </span>
                )}
              </span>
              <label class="relative inline-flex items-center cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  checked={task?.completionStatus}
                  class="sr-only peer"
                  onClick={() => handleStatusUpdate(task?._id)}
                />
                <div
                  class="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2
                peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
                rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
                after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 
                peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTable;
