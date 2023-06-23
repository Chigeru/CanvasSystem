import React, { useState, useMemo } from "react";
import {postObject} from "../../../lib/AxiosApi.js";

import Select from "react-select";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";

const priorityOptions = [
  {value: 0, label: "Very Low"},
  {value: 1, label: "Low"},
  {value: 2, label: "Normal"},
  {value: 4, label: "High"},
  {value: 8, label: "Very High"},
];

const workstateTypes = ["ready", "open", "waiting", "help", "closed"];

function FormCreateTask({propWorkstate= {}, projectData}) {
  const [newTask, setNewTask] = useState({});


  


  const simpleMmdOptions = useMemo(() => {
    return {
      spellChecker: false,
      previewRender(text) {
        return ReactDOMServer.renderToString(<ReactMarkdown children={text} />);
      },
    };
  }, []);


  function SelectFillWithProjectObjects(categoryList) {
    var options = [];
    categoryList.map((element) => 
      options.push({
        value: element._id,
        label: element.name.charAt(0).toUpperCase() + element.name.slice(1)
      })
    );

    return options;
  }


  function SelectFillWithSimpleData(categoryList) {
    var options = [];
    categoryList.map((element) => 
      options.push({
        value: element,
        label: element
      })
    );
    return options;
  }


  function SelectFillWithCategoryProjectObjects(categoryList, groupsList, objectProperty) {
    var groupSeperated = [];

    groupsList.map(groupElement => {
      var groupOptions = [];

      categoryList.map(categoryElement => {
        if(categoryElement[objectProperty] === groupElement) {
          groupOptions.push({
            value: categoryElement._id,
            label: categoryElement.name.charAt(0).toUpperCase() + categoryElement.name.slice(1)
          })
        }
        return null;
      });

      if(groupOptions.length > 0) {
        groupSeperated.push({label: groupElement, options: groupOptions});
      }
      return null;
    });
    return groupSeperated;
  }


  function HandleInputOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setNewTask((taskValues) => ({ ...taskValues, [name]: value }));
  }

  function HandleSimpleMdeChanged(value) {
    setNewTask((taskValues) => ({
      ...taskValues,
      description: value,
    }));
  }

  function HandleSelectionChanged(value, action) {
    if (Array.isArray(value)) {
      var valueList = value.map((element) => element.value);
      setNewTask((taskValues) => ({
        ...taskValues,
        [action.name]: valueList,
      }));
    } else {
      setNewTask((taskValues) => ({
        ...taskValues,
        [action.name]: value.value,
      }));
    }
  }

  function HandleSubmitForm(event) {
    event.preventDefault();
    ConvertUserToArray();

    postObject("form/taskcreation", newTask).then((response) => {
      if (response.status === 200) {
        setNewTask({});
        // HandleClose();
      }
    });
  }

  function ConvertUserToArray() {
    if(!Array.isArray(newTask.users)) {
      let temp = [];
      temp.push(newTask.users);
      setNewTask((values) => ({
        ...values,
        "users": temp
      }))
    }
  }

  function postTaskinfo() {
    console.log(newTask)
  }

  function HandleKeyDown(event) {
    if(event.ctrlKey && event.which === 13) {
      HandleSubmitForm(event);
    }
  }

  return (
    <form method="modal" onSubmit={HandleSubmitForm} onKeyDown={HandleKeyDown}>
      <div className="side-by-side-container">
        <div>
          <div>
            <label>Titel</label>
            <input type="text" name="title" onChange={HandleInputOnChange}/>
          </div>
          <div>
            <label>Beskrivelse</label>
            <SimpleMDE name="description" value={newTask.description} onChange={HandleSimpleMdeChanged} options={simpleMmdOptions} />
            </div>
        </div>

        <div>
          <div>
            <label>Workstate</label>
            <Select name="workstate" className="user-select" placeholder="Workstate" isSearchable options={SelectFillWithCategoryProjectObjects(projectData.workstates, workstateTypes, "type")} onChange={HandleSelectionChanged} />
          </div>
          <div>
            <label>Label</label>
            <Select name="label" className="user-select" placeholder="Label" isSearchable options={SelectFillWithProjectObjects(projectData.labels)} onChange={HandleSelectionChanged} />
          </div>
          <div>
            <label>Owner</label>
            <Select name="users" className="user-select" placeholder="Owner" isSearchable options={SelectFillWithProjectObjects(projectData.users)} onChange={HandleSelectionChanged} />
          </div>

          {/* Estimate, 0,1,2,4,8 */}
          <div>
            <label>Estimeret tid</label>
            <Select name="estimate" className="user-select" placeholder="estimeret tid" isSearchable options={SelectFillWithSimpleData([0,1,2,4,8])} onChange={HandleSelectionChanged} />
          </div>

          {/* Estimate, 0,1,2,4,8 */}
          <div>
            <label>Prioritet</label>
            <Select name="priority" className="user-select" placeholder="Prioritet" isSearchable options={priorityOptions} onChange={HandleSelectionChanged} />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <input type="submit" className="btn btn-primary" value="Tilføj"/>
        <button type="button" className="btn btn-cancel" onClick={postTaskinfo}>
          Cancel
        </button>
      </div>
      {/* 
          Title
          description
          * relation
          
          workstate
          * label
          * deadline
          users
          estimate / weight

          */}
    </form>
  );
}

export default FormCreateTask;
