import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../lib/AxiosApi.js";

import FormCreateTask from "../../../components/Modal/ModalContent/FormCreateTask.js";


function ProjectOverview() {
  const [projectData, setProjectData] = useState({});
  const [showModal, setShowModal] = useState(false);
  let { selectedproject } = useParams();

  useEffect(() => {
    if (typeof selectedproject === "string") {
      AxiosGetProjectData(`project/${selectedproject}`, setProjectData);
    }
  }, [selectedproject]);

  async function AxiosGetProjectData(searchString, setVariableValue) {
    try {
      const fetchedData = await getRequest(searchString);
      setVariableValue(fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(projectData);


    
  function HandleOpen() {
    setShowModal(true);
  }
  function HandleClose() {
    setShowModal(false);
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
                    <button className="image-btn" onClick={HandleOpen}>
                      <img src="/images/plus_rounded.png" alt="" />
                    </button>
                    <input type="checkbox" />
                  </div>
                </div>
                <div className="workstate-body">
                  {workstate.tasks.map((task, key) => {
                    return (
                      <div key={key} className="workstate-task" style={{ borderLeftColor: "#ff5010" }}>
                        <p>{task.title}</p>
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
          <strong>{projectData.name}</strong>{" "}
          {"deadline" in projectData ? ` - ${new Date(projectData.deadline).toLocaleDateString()}` : null}
        </h2>
      </div>
      <div className="project-expand-description-area">
        <p>
          {projectData.description} <br />
          <strong>Created: </strong>{" "}
          {new Date(projectData.createdAt).toLocaleDateString()} -{" "}
          <strong>Updated: </strong>{" "}
          {new Date(projectData.updatedAt).toLocaleDateString()}
        </p>
      </div>
      {WorkstateContainer()}
      <Modal show={showModal} onHide={HandleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCreateTask projectData={projectData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProjectOverview;
