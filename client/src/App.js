import { Route, Routes } from "react-router-dom";


import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import TaskDisplayList from "./pages/Front/TaskDisplayListPage";
import TaskDetailedOverview from "./pages/Front/TaskDetailedOverviewPage";

import LoginPage from "./pages/LoginPage";

import MyPage from "./pages/Front/StartPage";
import SelectedProject from "./pages/Front/MyPage/ProjectOverview";
// import MyPageProjectList from "./components/MyPage/ProjectList"

import AdminLayout from "./components/Admin/AdminLayout";
import AdminCreateStatus from "./pages/Admin/Create/AdminCreateStatus";
import AdminFrontPage from "./pages/Admin/AdminFrontpagePage";
import AdminCategoryOverviewPage from "./pages/Admin/Create/AdminCategoryOverviewPage";

import TableLayout from "./components/Admin/InformaitionWindow/TableLayout";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="tasks" element={<TaskDisplayList />}>
          <Route path=":id" element={<TaskDetailedOverview />}></Route>
        </Route>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:selectedproject" element={<SelectedProject />} />
      </Route>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/admin" element={<AdminLayout />} onEnter={requireAuth}>
        <Route index element={<AdminFrontPage />}/>
        <Route path="test" element={<AdminFrontPage />} />
        <Route path="status" element={<AdminCreateStatus />} />
        <Route path="dataoverview" element={<AdminCategoryOverviewPage />} >
          <Route path=":category" element={<TableLayout />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

function requireAuth(nextState, replace, next) {
  console.log(this.state.loggedInStatus);
  if (!this.state.loggedInStatus.contains("LOGGED_IN")) {
    replace({
      pathname: "/login",
      state: {nextPathname: nextState.location.pathname}
    });
  }
  next();
}

export default App;