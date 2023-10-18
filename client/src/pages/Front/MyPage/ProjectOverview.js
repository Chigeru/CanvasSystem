import React, { useEffect, useState, useContext, createContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { getRequest, deleteRequest } from "../../../lib/AxiosApi.js";
import ReactMarkdown from "react-markdown";


import FormCreateTask from "../../../components/Modal/ModalContent/FormCreateTask.js";

const ModalClosureContext = createContext();
export const useModalClosure = () => useContext(ModalClosureContext);


function ProjectOverview() {
  const [projectData, setProjectData] = useState({});
  let { selectedproject } = useParams();
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedWorkstate, setSelectedWorkstate] = useState({});

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

  function HandleOpen(wantedTask = {}, wantedWorkstate = {}) {
    setSelectedTask(() => wantedTask);
    setSelectedWorkstate(() => wantedWorkstate);
    setShowModal(true);
  }
  function HandleClose(refetch = false) {
    console.log("test: ", refetch)
    if(refetch) {
      AxiosGetProjectData(`project/${selectedproject}`, setProjectData);
    }
    setShowModal(() => false);
  }

  function DeleteTaskButton(workstateId, taskId) {

    if(window.confirm("Are you sure you want to delete this task?") === true) {
      AxiosDeleteTask(workstateId, taskId);
    }


  }
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
                      {workstate.name}
                    </div>
                    <span className="task-counter">
                      {workstate.tasks.length}
                    </span>
                  </div>
                  <div className="workstate-controls">
                    <img src="/images/three_dots.png" alt="" />
                    <button className="image-btn" onClick={() => HandleOpen({}, workstate)}>
                      <img src="/images/plus_rounded.png" alt="" />
                    </button>
                    <input type="checkbox" className="workstate-children-selection"/>
                  </div>
                </div>
                <div className="workstate-body">
                  {workstate.tasks.map((task, key) => {
                    return (
                      <div key={key} className="workstate-task" style={{borderLeft: `3px solid ${typeof(task.labels) !== "undefined" ? task.labels[0].color : "black"}`}}>
                        <div onClick={() => HandleOpen(task, workstate)}>
                          <div>
                            <p>{task.title}</p>
                          </div>
                        </div>
                        <button className="task-selection" onClick={() => DeleteTaskButton(workstate._id, task._id)}> x </button>
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
    <div>
      <div>
        <h2>
          <strong>{projectData.name}</strong>

          {projectData.hasOwnProperty("deadline") && ` - ${new Date(projectData.deadline).toLocaleDateString()}`}
          {/* {"deadline" in projectData ? ` - ${new Date(projectData.deadline).toLocaleDateString()}` : null} */}
        </h2>
        {projectData.hasOwnProperty("deadline") === true && <p>{new Date(projectData.deadline).toLocaleDateString()}</p>}
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
            <FormCreateTask currentTaskData={selectedTask} projectData={projectData} workstateFromSelectedTask={selectedWorkstate} updateParentDataFunction={AxiosGetUpdatedProjectData}/>
          </ModalClosureContext.Provider>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProjectOverview;
