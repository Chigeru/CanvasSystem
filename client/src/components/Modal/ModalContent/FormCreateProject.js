import React, {useMemo, useState} from 'react'
import { useModalClosure } from '../ModalBase.js';

import Select from "react-select";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";

import { postObject } from "../../../lib/AxiosApi.js";

const workstateTemplates = [
  { value: "network", label: "Netværk" },
  { value: "programmer", label: "Programmør" },
  { value: "simple", label: "Simpel" },
  { value: "empty", label: "Tom" },
];


function FormCreateProject({departmentsData}) {
  const [newProject, setNewProject] = useState({});
  const [showModal, setShowModal] = useModalClosure();
  
  departmentsData.sort(dynamicSort("name"));

  function HandleClose() {
    setShowModal(false);
  }


  function SelectFillDepartment() {
    var options = [];
    departmentsData.sort(dynamicSort("name"));
    departmentsData.map((departmentElement) =>
      options.push({
        value: departmentElement._id,
        label:
          departmentElement.name.charAt(0).toUpperCase() +
          departmentElement.name.slice(1),
      })
    );

    return options;
  }

  function SelectFillUsers() {
    var options = [];
    departmentsData.map((departmentElement) => {
      var group = [];
      departmentElement.users.sort(dynamicSort("name"));
      departmentElement.users.map((user) =>
        group.push({
          value: user._id,
          label: user.name.charAt(0).toUpperCase() + user.name.slice(1),
        })
      );

      if (typeof newProject.department !== "undefined") {
        if (departmentElement._id === newProject.department) {
          return options.unshift({label: `${departmentElement.name} - Fremhævet`, options: group,});
        } else {
          return options.push({ label: departmentElement.name, options: group});
        }
      } else {
        return options.push({ label: departmentElement.name, options: group });
      }
    });
    return options;
  }

  const simpleMmdOptions = useMemo(() => {
    return {
      spellChecker: false,
      previewRender(text) {
        return ReactDOMServer.renderToString(<ReactMarkdown children={text} />);
      },
    };
  }, []);

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result;
      if (typeof a[property] === "string") {
        result = a[property].toLowerCase() < b[property].toLowerCase() ? -1 : a[property].toLowerCase() > b[property].toLowerCase() ? 1 : 0;
      } else {
        result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      }
      return result * sortOrder;
    };
  }

  function FormInputCheck() {
    // if(newProject.name.length < 8) {}
    // else if(typeof(newProject.department) === "undefined") {}
    // else if(newProject.users.length < 1) {}
    // else if(typeof(newProject.workstates) === "undefined") {}
    // else if(typeof(newProject.deadline) !== "undefined") {
    //   if(new Date(newProject.deadline).getTime() < Date().getTime()) {}
    // }
    // else if(typeof(newProject.start) === "undefined") {}
    // else {
    //   alert("Projektet er blevet oprettet");
    // }
  }

  function HandleInputsOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setNewProject((projectValues) => ({ ...projectValues, [name]: value }));
  }

  function HandleSelectionChanged(value, action) {
    if (Array.isArray(value)) {
      var valueList = value.map((element) => element.value);
      setNewProject((projectValues) => ({
        ...projectValues,
        [action.name]: valueList,
      }));
    } else {
      setNewProject((projectValues) => ({
        ...projectValues,
        [action.name]: value.value,
      }));
    }
  }

  function HandleSimpleMdeChanged(value) {
    setNewProject((projectValues) => ({
      ...projectValues,
      description: value,
    }));
  }

  async function HandleSubmitForm(event) {
    event.preventDefault();

    FormInputCheck();
    postObject("form/projectcreation", newProject).then((response) => {
      if (response.status === 200) {
        setNewProject({});
        HandleClose();
      }
    });
  }

  function HandleKeyDown(event) {
    if(event.ctrlKey && event.which === 13) {
      HandleSubmitForm(event);
    }
  }



  return (
    <form method="modal" onSubmit={HandleSubmitForm}  onKeyDown={HandleKeyDown}>
            <div className="side-by-side-container">
              <div>
                <div>
                  <label>Navn</label>
                  <input type="text" name="name" placeholder="Projekt navn (min. 8 bogstaver)" onChange={HandleInputsOnChange} />
                </div>

                <div>
                  <label>Afdeling</label>
                  <Select name="department" className="department-select" placeholder="Vælg afdeling" isClearable={false} options={SelectFillDepartment()} onChange={HandleSelectionChanged} />
                </div>

                <div>
                  <label>Brugere</label>
                  <Select name="users" className="user-select" placeholder="Vælg brugere" isMulti isSearchable options={SelectFillUsers()} onChange={HandleSelectionChanged} />
                </div>
              </div>

              <div>
                <div>
                  <label>Layout template</label>
                  <Select name="template" placeholder="Vælg Template" options={workstateTemplates} isSearchable onChange={HandleSelectionChanged} />
                </div>

                <div>
                  <label>Deadline</label>
                  <input type="date" name="deadline" onChange={HandleInputsOnChange} min={new Date().toLocaleDateString("sv")} />
                </div>

                <div>
                  <label>Start dato</label>
                  <input type="date" name="startedAt" onChange={HandleInputsOnChange} />
                </div>
              </div>
            </div>

            <div>
              <label>Beskrivelse</label>
              <SimpleMDE name="description" value={newProject.description} onChange={HandleSimpleMdeChanged} options={simpleMmdOptions} />
            </div>

            <div className="mt-2">
              <input type="submit" className="btn btn-primary" value="Tilføj"/>
              <button type="button" className="btn btn-cancel" onClick={HandleClose}>
                Cancel
              </button>
            </div>
          </form>
  )
}

export default FormCreateProject