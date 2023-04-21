import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useParams } from "react-router-dom";
import { getRequest, deleteRequest } from "../../../api/AxiosApi";

import PopoutPanel from "../../PopoutPanel.js";

function TableLayout() {
  const [dataInformation, setDataInformation] = useState([]);
  const [searchData, setSearchData] = useState([]);

  let { category } = useParams();

  useEffect(() => {
    axiosGetData();
  }, [category]);

  async function axiosGetData() {
    try {
      const fetchedData = await getRequest(category);
      setDataInformation(fetchedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  function EditSelectedItem(item) {
    const root = createRoot(document.getElementById("panel"));
    root.render(<PopoutPanel passedItem={item} method="delete"/>);
  }

  function DeleteSelectedItem(item) {
    console.log(`Deleted: ${item._id}`);
  }

  function ShowSearchedItem(item, key) {
    if(searchData !== "") {}
  }

  function displayTable() {
    if (dataInformation.length > 0) {
      return (
        <div>
            <input type="text" placeholder="Search" className="search-input" id="tableSearcher"/>
        <table className="tabletest">
          <thead></thead>
          <tbody>
            {dataInformation.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{item.name}</td>
                  <td>
                    <button className="btn-edit" onClick={() => EditSelectedItem(item)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => DeleteSelectedItem(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      );
    }
  }

  return (
    <section className="w-100">
      {displayTable()}
      <div className="mt-3">
        <button className="btn-add-another">
          <span>Add another</span>
        </button>
      </div>
      <div id="panel"></div>
    </section>
  );
}

export default TableLayout;
