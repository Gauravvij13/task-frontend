import AddTask from "../components/addTask";
import TaskTable from "../components/taskTable";
import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../../../shared/hooks/api-hook";
import { TaskContext } from "../../../shared/context/task-context";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const { sendRequest } = useApiClient();

  const getTasks = useCallback(async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/tasks`
      );

      if (response?.data?.data) {
        setTasks(response?.data?.data);
      }
    } catch (error) {}
  }, [sendRequest]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
      }}
    >
      <div className="w-full flex justify-center flex-col items-center ">
        <div className="w-full md:px-10 lg:px-20">
          <AddTask />
          <TaskTable tasks={tasks || []} />
        </div>
      </div>
    </TaskContext.Provider>
  );
};

export default Tasks;
