import React from "react";
import { Link, Outlet } from "react-router-dom";
import TableLayout from "../../../components/Admin/InformaitionWindow/TableLayout";

function AdminCategoryOverviewPage() {
  return (
    <div className="d-flex flex-row">
      <section className="side-panel-overview">
        Sidepanel - categories
        <ul>
          <li>
            <Link to="tasks">Tasks</Link>
            <ul>
              <li>
                <Link to="taskstatus">Statuses</Link>
              </li>
              <li>
                <Link to="taskcategories">Categories</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
        </ul>
      </section>
      <Outlet />
    </div>
  );
}

export default AdminCategoryOverviewPage;
