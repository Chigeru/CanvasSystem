import { useEffect, useState } from "react";
import { getRequest } from "../../api/AxiosApi.js";

import InfoTaskCard from "../../components/Front/InfoTaskCard.js";

function TaskDisplayListPage() {
  const [taskList, setTaskList] = useState([]);
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, []);

  async function fetchTasks() {
    try {
      const fetchedData = await getRequest("tasks");
      setTaskList(fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchStatuses() {
    try {
      const fetchedData = await getRequest("taskstatus");
      setStatusList(fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  function FillCategories(category) {
    return (
      <div>
        {taskList.map((task, index) => {
          if (task.status.name === category) {
            return <InfoTaskCard data={task} key={index} />;
          } else {
            return null;
          }
        })}
      </div>
    );
  }

  function convertStringToDate(data) {
    let date = new Date(data);
    let date2 = new Date();
    return (
    <>
      {date.toLocaleDateString("da-DK")} <br />
      {date2.toLocaleDateString("da-DK")}
    </>);
  }

  return (
    <div className="d-flex flex-column">
      <div>
        <h2>Active</h2>
        <hr />
        {taskList.map((task, key) => {
          if (task.status.name === "closed" || task.status.name === "waiting") {
            return null;
          } else {
            return (
              <div key={key}>
                <p>
                  {task.title} - {task.status.name} <br />
                  {convertStringToDate(task.updatedAt)}
                </p>
              </div>
            );
          }
        })}
      </div>

      <div>
        <h2>Waiting</h2>
        <hr />
        {taskList.map((task, key) => {
          if (task.status.name === "waiting") {
            return (
              <div key={key}>
                <p>
                  {task.title} - {task.status.name} <br />
                  {convertStringToDate(task.updatedAt)}

                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <div>
        <h2>Closed lately</h2>
        <hr />
        {taskList.map((task, key) => {
          if (task.status.name === "closed") {
            return (
              <div key={key}>
                <p>
                  {task.title} - {task.status.name} <br />
                  {convertStringToDate(task.updatedAt)}

                  
                </p>
                
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      {/* <TaskList worktasks={params.worktasks} /> */}
    </div>
  );
}

export default TaskDisplayListPage;
