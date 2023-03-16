import React, { useState } from "react";
import { postRequest } from "../../../api/AxiosApi.js";

function AdminCreateStatus() {
  const [statusName, setStatusName] = useState("");
  const [objectToPost, setObjectToPost] = useState({name: "test", woop: "test2"});

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({name: statusName});
  };

  const handleChange = (e) => {
    setStatusName(e.target.value)
  }

  async function postData(postElement) {
    await postRequest("post/taskstatus", postElement);
  }

  function LoopThroughObject(targetObject) {
    for(let variable in targetObject) {
      console.log(variable);
    }
  }

  return (
    <div>
      AdminCreateStatus
      <form onSubmit={(e) => handleSubmit(e)} action="/taskstatus" method="post">
        <label>Status name</label>
        <input
          type="text"
          value={statusName}
          onChange={e => handleChange(e)}
        />
        <input type="submit" value="Submit" />
      </form>
        {Object.keys(objectToPost).map(function(key) {
          return <p key={key}>{objectToPost[key]}</p>
        })}
      </div>
  );
}

export default AdminCreateStatus;
