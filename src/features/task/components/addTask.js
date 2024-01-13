import { useContext, useState } from "react";
import { TaskContext } from "../../../shared/context/task-context";
import { useApiClient } from "../../../shared/hooks/api-hook";
import Modal from "../../../UIElements/Modal";
import TaskForm from "./TaskForm";

const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  const { sendRequest } = useApiClient();
  const task = useContext(TaskContext);
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleSubmit = async (values) => {
    const { title, description, dueDate } = values;

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/tasks`,
        "POST",
        JSON.stringify({
          title,
          description,
          dueDate,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      task.getTasks();
    } catch (error) {}
    handleCancel();
  };

  return (
    <div className="">
      <button
        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        onClick={() => setShowModal(true)}
      >
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Add Task{" "}
        </span>
      </button>

      <Modal
        title={"Add Task"}
        showModal={showModal}
        handleCancel={handleCancel}
      >
        <TaskForm
          initialValues={{
            title: "",
            description: "",
            dueDate: new Date(),
          }}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default AddTask;
