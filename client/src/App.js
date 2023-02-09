import { Route, Routes } from "react-router-dom";
import "./styles/styling.scss";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";

import api from "./api/tasksApi";

import Layout from "./pages/Layout";
import Home from "./pages/HomePage";
import TaskDisplayList from "./pages/TaskDisplayListPage";
import TaskDetailedOverview from "./pages/TaskDetailedOverviewPage";
import AdminCreateStatus from "./pages/Admin/Create/AdminCreateStatus";

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/tasks').then(res => setUsers(res.data));
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home users={users} />}></Route>
        <Route path="/worktasks" element={<TaskDisplayList />}></Route>
        <Route path="/:objectId" element={<TaskDetailedOverview />}></Route>
        <Route path="/admin/create/status" element={<AdminCreateStatus />} />
      </Route>
    </Routes>
  );
}

export default App;