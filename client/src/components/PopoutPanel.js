import React from "react";

function PopoutPanel({ passedItem, method }) {

  // let temp = document.querySelector(".popout-dark-area");
  // console.log(temp);
  // temp.addEventListener("mousedown", handleClickOutside);

  function handleClickOutside() {
    alert("Idk anymore")
  }


  return (
      
    <div className="popout-dark-area" onClick={() => handleClickOutside()}>
      <div className="popout-panel right">
        PopoutPanel
        {passedItem.name}
        <form>
          <div className="form-vertical">
            <label>{passedItem.name}</label>
            <input type="text" />
            <label>{passedItem._id}</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  
  );
}

export default PopoutPanel;
