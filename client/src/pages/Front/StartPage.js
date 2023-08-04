import React, { useEffect, useState } from "react";
import { getRequest } from "../../lib/AxiosApi";

import ProjectListOverview from "../../components/MyPage/ProjectListOverview";

import ModalBase from "../../components/Modal/ModalBase.js";
import FormCreateProject from "../../components/Modal/ModalContent/FormCreateProject";

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
        <ModalBase modalTitle="" modalButton="Create Project">
          <FormCreateProject departmentsData={departmentData} />
        </ModalBase>
      </div>
      
      {departmentData.length > 0 ? (
        <ProjectListOverview projectData={departmentData[0].projects} />
      ) : (
        ""
      )}
    </div>
  );
}

export default StartPage;
