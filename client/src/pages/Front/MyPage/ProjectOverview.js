import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../lib/AxiosApi.js";

function ProjectOverview() {
  const [projectData, setProjectData] = useState([]);
  const [workflowsData, setWorkflowsData] = useState([]);
  let { selectedproject } = useParams();

  useEffect(() => {
    console.log(selectedproject);
    if (typeof selectedproject === "string") {
      AxiosGetProjectData(`project/${selectedproject}`, setProjectData);
      AxiosGetProjectData(`project/${selectedproject}/workflow`, setWorkflowsData);
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

  function Modaltestopen() {
    const modal = document.querySelector("[data-modal]");
    modal.showModal();
  }

  function ModaltestClose() {
    const modal = document.querySelector("[data-modal]");
    modal.close();
  }

  function WorkflowContainer() {
    if (
      typeof projectData.workflows === "object" &&
      projectData.workflows.length > 0
    ) {
      return (
        <div className="sidescroller workflow-container">
          <div className="d-flex flex-row">
            <hr />
            {workflowsData.map((workflow, key) => {
              return (
                <div key={key} className="workflow-column">
                  <div className="workflow-head">
                    <div className="workflow-headline">
                      <div className="workflow-headline-text">{workflow.name}</div>
                      <span className="task-counter">{workflow.tasks.length}</span>
                    </div>
                    <div className="workflow-controls">
                      <img src="/images/three_dots.png" alt=""/>
                      <img src="/images/plus_rounded.png" alt=""/>
                      <input type="checkbox" />
                    </div>
                  </div>
                  <div className="workflow-body">
                    {workflow.tasks.map((task, key) => {
                      return (
                        <div key={key} className="workflow-task" style={{borderLeftColor: "#ff5010"}}>
                          <p>{task.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="workflow-container">
          We couldn't get your planning, please try again
        </div>
      );
    }
  }

  return (
    <div>
      <div data-overlay className="overlay"></div>
      <div>
        <h2>
          <strong>{projectData.name}</strong>{" "}
          {"deadline" in projectData
            ? ` - ${new Date(projectData.deadline).toLocaleDateString()}`
            : null}
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
        <dialog data-modal>
          idk if this works
          <button data-close-modal onClick={ModaltestClose}>
            close
          </button>
        </dialog>
        <button data-open-modal onClick={Modaltestopen}>
          hello
        </button>
      </div>
      {WorkflowContainer()}
    </div>
  );
}

export default ProjectOverview;
