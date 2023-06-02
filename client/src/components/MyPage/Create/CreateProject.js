import React from "react";

function CreateProject({departmentsData}) {

  return (
    <div className="modal fade" id="reg-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="modal-title">
              Create Project
            </h4>
          </div>
          <div className="modal-body">
            <form method="modal">
              <div>
                <label>Name</label>
                <input type="text" name="name"/>
              </div>
              
              {/* <input /> department */}
              <div>
                <label>Department</label>
                <select name="department">
                  {departmentsData.map(department => {
                    return <option value={department._id}>{department._name}</option>
                  })}
                </select>
              </div>
              {/* <input /> users */}
              {/* <input /> workflows */}
              {/* <input /> labels */}
              
              <div>
                <label>Deadline</label>
                <input type="date" name="deadline" />
              </div>

              
              <div>
                <label>Start</label>
                <input type="date" name="startedAt" />
              </div>
              
              <div>
                <label>Description</label>
                <textarea name="description"></textarea>
              </div>
              <div className="justify-content-end mt-5">
                <input type="button" className="btn btn-primary" value="Submit" />
                <button type="button" className="btn btn-cancel" data-dismiss="modal" aria-label="Close">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
