import { useContext, useState } from "react";
import Modal from "../../../UIElements/Modal";
import TaskForm from "./TaskForm";
import { useApiClient } from "../../../shared/hooks/api-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { TaskContext } from "../../../shared/context/task-context";

const UpdateTask = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const { sendRequest } = useApiClient();
  const auth = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = async (values) => {
    const { title, description, dueDate } = values;
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/tasks/${task?._id}`,
        "PATCH",
        JSON.stringify({
          title,
          description,
          dueDate,
        }),
        {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        }
      );

      if (response?.data?.task) {
        taskContext.getTasks();
        handleCancel();
      }
    } catch (error) {}
  };

  return (
    <div className=" ">
      <div
        className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Edit{" "}
      </div>

      <Modal
        title={"Add Task"}
        showModal={showModal}
        handleCancel={handleCancel}
      >
        <TaskForm
          initialValues={{
            title: task?.title,
            description: task?.description,
            dueDate: task?.dueDate,
          }}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default UpdateTask;
