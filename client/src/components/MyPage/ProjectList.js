import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../api/AxiosApi";

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

  return (
    <div className="container">
      ProjectList
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
