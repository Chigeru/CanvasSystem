import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminCategoryOverviewPage() {
  return (
    <div className="d-flex flex-row">
      <section className="side-panel-overview">
        Sidepanel - categories
        <ul>
          <li>
            <Link to="project">Projects</Link>
            <ul>
              <li>
                <Link to="task">Tasks</Link>
              </li>
              <li>
                <Link to="category">Categories</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="user">Users</Link>
          </li>
        </ul>
      </section>
      <Outlet />
    </div>
  );
}

export default AdminCategoryOverviewPage;
