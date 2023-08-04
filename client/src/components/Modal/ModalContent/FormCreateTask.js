import React, { useState, useEffect, useMemo } from "react";
import {postObject} from "../../../lib/AxiosApi.js";
import { useModalClosure } from "../../../pages/Front/MyPage/ProjectOverview.js";

import Select from "react-select";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";

const priorityOptions = [
  {value: 8, label: "Very High"},
  {value: 4, label: "High"},
  {value: 2, label: "Normal"},
  {value: 1, label: "Low"},
  {value: 0, label: "Very Low"},
];

const workstateTypes = ["ready", "open", "waiting", "help", "closed"];


function FormCreateTask({currentTaskData = {}, workstateFromSelectedTask = {}, projectData, updateParentDataFunction = () => {}}) {
  const [newTask, setNewTask] = useState({});
  const [newTaskOptions, setNewTaskOptions] = useState({});
  const [ ,setShowModal] = useModalClosure();

  useEffect(() => {
    SelectFillWithCategoryProjectObjects(projectData.workstates, workstateTypes, "type", "workstate")
    SelectFillWithProjectObjects(projectData.labels, "labels");
    SelectFillWithProjectObjects(projectData.users, "users");
    SelectFillWithSimpleData([0,1,2,4,8], "estimate");
    setNewTaskOptions((values) => ({...values, priority: priorityOptions }))
    if(typeof(currentTaskData) !== "undefined" && Object.keys(newTask).length === 0) {
      setNewTask(() => currentTaskData);
      setNewTask((currentData) => ({...currentData, prevworkstate: workstateFromSelectedTask._id, workstate: workstateFromSelectedTask._id}));
    }
  },[currentTaskData, newTask, projectData.labels, projectData.users, projectData.workstates, workstateFromSelectedTask._id])
  
  // console.log(newTask);

  const simpleMmdOptions = useMemo(() => {
    return {
      spellChecker: false,
      previewRender(text) {
        return ReactDOMServer.renderToString(<ReactMarkdown children={text} />);
      },
    };
  }, []);

  function HandleClose() {
    setShowModal(false);
  }

  function SelectFillWithProjectObjects(categoryList, categoryName) {
    var options = [];
    categoryList.map((element) => 
      options.push({
        value: element._id,
        label: element.name.charAt(0).toUpperCase() + element.name.slice(1)
      })
    );
    setNewTaskOptions((values) => ({...values, [categoryName]: options }))
  }


  function SelectFillWithSimpleData(categoryList,categoryName) {
    var options = [];
    categoryList.map((element) => 
      options.push({
        value: element,
        label: element
      })
    );
    setNewTaskOptions((values) => ({...values, [categoryName]: options }))
  }


  function SelectFillWithCategoryProjectObjects(categoryList, groupsList, objectProperty, categoryName) {
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

    setNewTaskOptions((values) => ({...values, [categoryName]: groupSeperated }))

  }


  function SetInitialValue(area, list = true) {
   
   
     var getValue = currentTaskData[area]   // list af labels id
    if(Array.isArray(getValue) && list) {
      let temp = []
      projectData[area].map((element) => {   //tjekker alle projekt label igennem
        getValue.map(tasklabel => {
          if(element._id === tasklabel) {
            temp.push({label: element.name, value: element._id});
            return true;
          }
          return false;
        })
        return false
      });

      return temp;

    }

    else if(area === "priority") {
      let temp = priorityOptions.find((prio) => prio.value === getValue);
      return temp ;
    }
    
    else if(Array.isArray(getValue) && list === false) {
      let temp = projectData[area].find((element) => {
        if(element._id === getValue[0]) {
          return {label: element.name, value: element._id}
        } else return false;
      });

      return {label: temp.name, value: temp._id};
    }
    
    else {
      return typeof(currentTaskData[area]) !== "undefined" ? {label: currentTaskData[area], value: currentTaskData[area]} : null ;
    }
  }

  function SetWorkstateInitialValue() {
    return {label: workstateFromSelectedTask.name , value: workstateFromSelectedTask._id }
  }

  function HandleInputOnChange(event) {
    setNewTask((taskValues) => ({ ...taskValues, [event.target.name]: event.target.value }));
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

    if(typeof(newTask._id) !== "undefined") {
      // console.log(newTask)
      postObject("form/taskupdate", newTask).then((response) => {
        if (response.status === 200) {
          updateParentDataFunction()
          HandleClose(true);
        }
      });
    }
    else {
      postObject("form/taskcreation", newTask).then((response) => {
        if (response.status === 200) {
          updateParentDataFunction();
          HandleClose(true);
          
        }
      });
    }
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
    setShowModal(() => (false));
  }

  function HandleKeyDown(event) {
    if(event.ctrlKey && event.which === 13) {
      HandleSubmitForm(event);
    }
  }

  function BtnSubmitText() {
    if(typeof(currentTaskData._id) === "undefined") {
      return "Tilføj"
    }  else return "Opdater"
  }

  return (
    <form method="modal" className="modal-form" onSubmit={HandleSubmitForm} onKeyDown={HandleKeyDown}>
      <div className="side-by-side-container">
        <div className="side-big">

            <textarea name="title" placeholder="Indsæt titel" wrap="soft" className="modal-name" defaultValue={currentTaskData.title} onChange={HandleInputOnChange}/>

          {/* <input type="text" name="title" placeholder="Indsæt titel" defaultValue={currentTaskData.title} onChange={HandleInputOnChange}/> */}
          {/* <div>
            <label>Titel</label>
            <input type="text" name="title" defaultValue={currentTaskData.title} onChange={HandleInputOnChange}/>
          </div> */}
          <div>
            <label>Beskrivelse</label>
            <SimpleMDE name="description" value={currentTaskData.description} onChange={HandleSimpleMdeChanged} options={simpleMmdOptions} />
            </div>
        </div>

        <div className="side-small">
          <div>
            <label>Workstate</label>
            <Select name="workstate" className="user-select" defaultValue={SetWorkstateInitialValue} placeholder="Workstate" isSearchable options={newTaskOptions.workstate} onChange={HandleSelectionChanged} />
          </div>
          <div>
            <label>Label</label>
            <Select name="labels" className="user-select" defaultValue={SetInitialValue("labels", true)} placeholder="Label" isMulti isSearchable options={newTaskOptions.labels} onChange={HandleSelectionChanged} />
          </div>
          <div>
            <label>Owner</label>
            <Select name="users" className="user-select" defaultValue={SetInitialValue("users", false)} placeholder="Owner" isSearchable options={newTaskOptions.users} onChange={HandleSelectionChanged} />
          </div>
          <div>
            <label>Estimeret tid</label>
            <Select name="estimate" className="user-select" defaultValue={SetInitialValue("estimate", false)} placeholder="estimeret tid" isSearchable options={newTaskOptions.estimate} onChange={HandleSelectionChanged} />
          </div>
          <div>
            <label>Prioritet</label>
            <Select name="priority" className="user-select" defaultValue={SetInitialValue("priority")} placeholder="Prioritet" isSearchable options={newTaskOptions.priority} onChange={HandleSelectionChanged} />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <input type="submit" className="btn btn-primary" value={BtnSubmitText()} />
        <button type="button" className="btn btn-cancel" onClick={postTaskinfo}>
          Cancel
        </button>
      </div>
      {/* 
          Title
          description
          * relation
          
          workstate
          label
          * deadline
          users
          estimate / weight

          */}
    </form>
  );
}

export default FormCreateTask;
