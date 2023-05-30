import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../lib/AxiosApi";
import CreateProject from "./Create/CreateProject.js";
import ProgressBar from 'react-bootstrap/ProgressBar';

function ProjectList() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    AxiosGetData(`project/extended`, setProjectData);
  }, []);

  async function AxiosGetData(searchString, setVariableValue) {
    try {
      const fetchedData = await getRequest(searchString);
      setVariableValue(fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  function DisplayUsers(project) {
    return (
      <>
        {project.users.map((user, key) => {
          return (
            <Fragment key={key}>
              {key !== 0 ? `, ${user.name}` : `${user.name}`}
            </Fragment>
          );
        })}
      </>
    );
  }

  function CalcTaskProgression(projectCurrent) {
    let progress = 0;
    let helpNeeded = 0;
    let total = 0;

    if(typeof(projectCurrent.workflows) !== 'undefined') {
      projectCurrent.workflows.map((workflow) => {
        workflow.tasks.map((task) => {
          if(workflow.type === 'closed') progress += task.weight;
          if(workflow.type === 'help') helpNeeded += task.weight;
          return total += task.weight;
        })
        return true;
      })
    }

    let calcProcent = (progress === 0 || total === 0) ? 0 : (progress/total)*100;
    let calcHelpProcent = (helpNeeded === 0 || total === 0) ? 0 : (helpNeeded/total)*100;
    return (
      <div>
        <ProgressBar>
          <ProgressBar variant="success" now={calcProcent} label={`${calcProcent}%`} key={1}/>
          <ProgressBar variant="warning" now={calcHelpProcent} key={2}/>
        </ProgressBar>
      </div>
    )
  }

  return (
    <div className="container">
      <br/>
      <section>
        <button className="btn btn-primary" data-toggle="modal" data-target="#reg-modal">Create Project</button>  
      </section>    

      <CreateProject />

      <div className="row">
        {projectData.map((project, key) => {
          return (
            <div className="col-lg-4 col-md-6 col-12" key={key}>
              <Link to={project._id} className="linkref">
                <div className="project-list-entity ">
                  <div className="section-top">
                    <h4 className="headline">{project.name}</h4>
                  </div>
                  <div className="section-bottom">
                    <ul>
                      <li>
                        <strong>Deltagere: </strong>
                        {DisplayUsers(project)}
                      </li>
                      <li>
                      {CalcTaskProgression(project)}
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;
