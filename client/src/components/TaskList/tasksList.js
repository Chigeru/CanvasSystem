import React from "react";


function TasksList(worktasks) {
  return (
    <div className="container">
      {worktasks.map((task) => {
        return (
          <div className="row">
            <div className="col-md-2">{task.worktask}</div>
          </div>
        );
      })}
    </div>
  );
}

export default TasksList;
