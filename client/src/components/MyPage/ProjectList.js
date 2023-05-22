import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../api/AxiosApi";
import CreateProject from "./Create/CreateProject.js";
import ProgressBar from 'react-bootstrap/ProgressBar';

function ProjectList() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axiosGetData("project", setProjectData);
  }, []);

  async function axiosGetData(searchString, setUseState) {
    try {
      const fetchedData = await getRequest(searchString);
      setUseState(fetchedData.data);
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

  function CalcTaskProgression() {
    let progress = 7;
    let helpNeeded = 2;
    let total = 20;
    let projectWorkflowsClosed = [];
    if(typeof(projectData.workflow) !== 'undefined') {
      projectData.workflow.foreach((workflow) => {
        if(workflow.type === 'closed') projectWorkflowsClosed.push(workflow);
        else if(workflow.type === 'help') projectWorkflowsClosed.push(workflow);
      })
    }
    
    // projectData.tasks.foreach((task) => {
    //   total += task.weight;
    //   projectWorkflowsClosed.some((workflowClosed) => {
    //     if(task.workflow === workflowClosed._id) {
    //           progress += task.weight;
    //           return true;
    //     }
    //     return false;
    //   })
    // })

    let calcProcent = (progress/total)*100;
    let calcHelpProcent = (helpNeeded/total)*100;
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

      ProjectList
      <section>
        <button className="btn btn-primary" data-toggle="modal" data-target="#reg-modal">Create Project</button>  
      </section>    

      <CreateProject />

      <div className="row">
        {projectData.map((project, key) => {
          console.log(project);
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
                      {CalcTaskProgression()}
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
