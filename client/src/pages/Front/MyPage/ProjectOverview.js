import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../api/AxiosApi.js";

function ProjectOverview() {
  const [projectData, setProjectData] = useState([]);
  let { selectedproject } = useParams();

  useEffect(() => {
    console.log(selectedproject);
    if (typeof selectedproject === "string") {
      AxiosGetData("project/" + selectedproject);
    }
  }, [selectedproject]);

  async function AxiosGetData(searchString) {
    try {
      const fetchedData = await getRequest(searchString);
      setProjectData(fetchedData.data);
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
          <div>
            <hr />
            {projectData.workflows.map((workflow, key) => {
              return (
                <div key={key}>
                  <h4>{workflow.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="workflow-container">
          We couldn't get your work, please try again
        </div>
      );
    }
  }

  return (
    <div>
      <div data-overlay className="overlay"></div>
      <div>
        <h2>
          <strong>{projectData.name}</strong> {"deadline" in projectData ? ` - ${new Date(projectData.deadline).toLocaleDateString()}` : null} 
        </h2>
      </div>
      <div className="project-expand-description-area">
        <p>
          {projectData.description} <br/>
          <strong>Created: </strong>{" "}
          {new Date(projectData.createdAt).toLocaleDateString()} -{" "}
          <strong>Updated: </strong>{" "}
          {new Date(projectData.updatedAt).toLocaleDateString()}
        </p>
        <dialog data-modal>
          idk if this works
          <button data-close-modal onClick={ModaltestClose}>close</button>
        </dialog>
        <button data-open-modal onClick={Modaltestopen}>hello</button>
        {WorkflowContainer()}
      </div>
    </div>
  );
}

export default ProjectOverview;
