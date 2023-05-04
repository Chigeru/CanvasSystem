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

  function WorkflowContainer() {
    
      if(typeof(projectData.workflows) === "object" && projectData.workflows.length > 0) {
        return (
          <div className="sidescroller workflow-container">
            <div>
              <hr/>
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
      }
      else {
        return (
          <div className="workflow-container">
            We couldn't get your work, please try again
          </div>
        );
      }
    
    
  }

  return (
    <div>
      ProjectOverview
      <div>
        <h2>
          <strong>{projectData.name}</strong>
        </h2>
      </div>
      <div>
        <p>
          <strong>Created: </strong>{" "}
          {new Date(projectData.createdAt).toLocaleDateString()} -{" "}
          <strong>Updated: </strong>{" "}
          {new Date(projectData.updatedAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Project description:</strong> {projectData.description}
        </p>
        {WorkflowContainer()}
      </div>
    </div>
  );
}

export default ProjectOverview;
