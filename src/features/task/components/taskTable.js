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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Due Date
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {task?.title}
              </th>
              <td className="px-6 py-4"> {task?.description}</td>
              <td className="px-6 py-4"> {task?.dueDate}</td>

              <td className="px-6 py-4">
                {" "}
                <label class="relative inline-flex items-center cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={task?.completionStatus}
                    class="sr-only peer"
                    onClick={() => handleStatusUpdate(task?._id)}
                  />

                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {task?.completionStatus ? "Completed" : "Pending"}
                  </span>
                </label>
              </td>

              <td className="px-6 py-4 ">
                <div className="flex">
                  <UpdateTask task={task} />
                  <div
                    onClick={() => handleDelete(task?._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-5 cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
