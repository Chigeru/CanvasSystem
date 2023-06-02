import React, { useEffect, useState } from "react";
import ProjectListOverview from "../../components/MyPage/ProjectListOverview";
import { getRequest } from "../../lib/AxiosApi";
import CreateProject from "../../components/MyPage/Create/CreateProject.js";

// import ProjectListDeparmentOverview from '../../components/MyPage/ProjectListDeparmentOverview.js'

function StartPage() {
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    AxiosGetData(`department/expanded`, setDepartmentData);
  }, []);

  async function AxiosGetData(searchString, setVariableValue) {
    try {
      const fetchedData = await getRequest(searchString);
      setVariableValue(fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <br />
      <div className="container">
        <button className="btn btn-primary" data-toggle="modal" data-target="#reg-modal">
          Create Project
        </button>
      </div>

      <CreateProject departmentsData={departmentData} />
      {departmentData.length > 0 ? (
        <ProjectListOverview projectData={departmentData[0].projects} />
      ) : (
        ""
      )}
    </div>
  );
}

export default StartPage;
