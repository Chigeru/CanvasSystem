import React, { useEffect, useState, useContext, createContext, useRef} from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { getRequest, deleteRequest } from "../../../lib/AxiosApi.js";
import FilterMenu from "../../../components/MyPage/FilterMenu.js";

import ReactMarkdown from "react-markdown";
import FormCreateTask from "../../../components/Modal/ModalContent/FormCreateTask.js";

const ModalClosureContext = createContext();
export const useModalClosure = () => useContext(ModalClosureContext);

function ProjectOverview() {
  let { selectedproject } = useParams();
  const [projectData, setProjectData] = useState({});
  const checkedTasks = useRef([]);

  const [modalSelectedTask, setModalSelectedTask] = useState({});
  const [modalSelectedWorkstate, setModalSelectedWorkstate] = useState({});
  const [showModal, setShowModal] = useState(false);
  const contextvalue = [showModal, setShowModal];

  useEffect(() => {
    if (typeof selectedproject === "string") {
      AxiosGetProjectData(`project/${selectedproject}`, setProjectData);
    }
  }, [selectedproject]);

  async function AxiosGetProjectData(searchString) {
    try {
      const fetchedData = await getRequest(searchString);
      setProjectData(() => fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function AxiosDeleteTask(workstateId, taskId) {
    try {
      let linkURL = `project/${projectData._id}/workstate/${workstateId}/task/delete/${taskId}`;
      deleteRequest(linkURL).then((response) => {
        if (response.status === 200) {
          AxiosGetProjectData(`project/${selectedproject}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function AxiosGetUpdatedProjectData() {
    try {
      const fetchedData = await getRequest(`project/${selectedproject}`);
      setProjectData(() => fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  function RegisterTaskChecked(selectedTask, checker) {
    if (checker) {
    }
  }

  function HandleOpen(wantedTask = {}, wantedWorkstate = {}) {
    setModalSelectedTask(() => wantedTask);
    setModalSelectedWorkstate(() => wantedWorkstate);
    setShowModal(true);
  }
  function HandleClose(refetch = false) {
    console.log("test: ", refetch);
    if (refetch) {
      AxiosGetProjectData(`project/${selectedproject}`, setProjectData);
    }
    setShowModal(() => false);
  }

  function DeleteTaskButton(workstateId, taskId) {
    if (window.confirm("Are you sure you want to delete this task?") === true) {
      AxiosDeleteTask(workstateId, taskId);
    }
  }

  console.log(projectData);

  function WorkstateContainer() {
    if (
      typeof projectData.workstates === "object" &&
      projectData.workstates.length > 0
    ) {
      return (
        <div className="workstate-container">
          {projectData.workstates.map((workstate, key) => {
            return (
              <div key={key} className="workstate-column">
                <div className="workstate-head">
                  <div className="workstate-headline">
                    <div className="workstate-headline-text">
                      <span>{workstate.name}</span>
                    </div>
                    <span className="task-counter">
                      {workstate.tasks.length}
                    </span>
                  </div>
                  <div className="workstate-controls">
                    <img src="/images/three_dots.png" alt="" />
                    <button
                      className="image-btn"
                      onClick={() => HandleOpen({}, workstate)}
                    >
                      <img src="/images/plus_rounded.png" alt="" />
                    </button>
                    {/* <input
                      type="checkbox"
                      className="workstate-children-selection"
                    /> */}
                  </div>
                </div>
                <div className="workstate-body">
                  {workstate.tasks.map((task, key) => {
                    return (
                      <div
                        key={key}
                        className="workstate-task"
                        style={{
                          borderLeft: `3px solid ${
                            typeof task.labels !== "undefined"
                              ? task.labels[0].color
                              : "black"
                          }`,
                        }}
                      >
                        <div onClick={() => HandleOpen(task, workstate)}>
                          <div>
                            <p className="task-card-title">{task.title}</p>
                            <div className="task-card-area">
                              <div className="task-card-labels">
                                {task.labels.map((label, key) => {
                                  return (
                                    <div className="task-card-labels-content" key={key}>
                                      {/* <div className="color-circle" style={{background: `${label.color}`}></div> */}
                                      <div className="task-card-name">
                                        <span>
                                        {label.name}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="task-responsible-icons">
                                {task.users.map((user, key) => {
                                  return (
                                    <div key={key}>
                                      <span>
                                        {user.name[0]}
                                      </span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="task-selection"
                          onClick={() =>
                            DeleteTaskButton(workstate._id, task._id)
                          }
                        >
                          <span>x</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="workstate-container">
          We couldn't get your planning, please try again
        </div>
      );
    }
  }



  return (
    <div className="project-canvas">
      <FilterMenu />
      <div className="project-canvas-content">
        <div className="projekt-canvas-info">
          <h2>
            <strong>{projectData.name}</strong>

            {projectData.hasOwnProperty("deadline") &&
              ` - ${new Date(projectData.deadline).toLocaleDateString()}`}
            {/* {"deadline" in projectData ? ` - ${new Date(projectData.deadline).toLocaleDateString()}` : null} */}
          </h2>
          {projectData.hasOwnProperty("deadline") === true && (
            <p>{new Date(projectData.deadline).toLocaleDateString()}</p>
          )}
        </div>
        <div className="project-expand-description-area">
          <ReactMarkdown children={projectData.description} />
          <p>
            <strong>Created: </strong>{" "}
            {new Date(projectData.createdAt).toLocaleDateString()} -{" "}
            <strong>Updated: </strong>{" "}
            {new Date(projectData.updatedAt).toLocaleDateString()}
          </p>
        </div>
        {WorkstateContainer()}
        <Modal show={showModal} onHide={HandleClose} size="lg">
          {/* <Modal.Header>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header> */}
          <Modal.Body>
            <ModalClosureContext.Provider value={contextvalue}>
              <FormCreateTask
                currentTaskData={modalSelectedTask}
                projectData={projectData}
                workstateFromSelectedTask={modalSelectedWorkstate}
                updateParentDataFunction={AxiosGetUpdatedProjectData}
              />
            </ModalClosureContext.Provider>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ProjectOverview;
