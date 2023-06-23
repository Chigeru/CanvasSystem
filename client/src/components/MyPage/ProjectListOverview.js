import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';

function ProjectListOverview({projectData}) {

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

    if(typeof(projectCurrent.workstates) !== 'undefined') {
      projectCurrent.workstates.map((workstate) => {
        workstate.tasks.map((task) => {
          const calcTaskProcent = task.estimate * task.priority;
          if(workstate.type === 'closed') progress += calcTaskProcent;
          if(workstate.type === 'help') helpNeeded += calcTaskProcent;
          return total += calcTaskProcent;
        })
        return true;
      })
    }

    let calcProcent = (progress === 0 || total === 0) ? 0 : Math.floor((progress/total)*100);
    let calcHelpProcent = (helpNeeded === 0 || total === 0) ? 0 : Math.floor((helpNeeded/total)*100);
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

export default ProjectListOverview;
