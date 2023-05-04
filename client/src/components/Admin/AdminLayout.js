import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function AdminLayout({route}) {
  
  const location = useLocation(); 
  
  console.log(location);
  // console.log(route);
  
  useEffect(() => {

  }, []);
  

  return (
    <div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-8 d-flex align-items-center">
              <nav className="navigation">
                <ul>
                  <li>
                    <Link to="test" className="link-categoryPageRef">Test</Link>
                  </li>
                  <li>
                    <Link to="status" className="link-categoryPageRef">Status</Link>
                  </li>
                  <li>
                    <Link to="dataoverview" className="link-categoryPageRef">Data Overview</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-4">
              <a href="/" className="linkref"><h1>AdminLayout</h1></a>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
      
      <footer>
        <p>
          This Admin page is only for testing purpose  
        </p>
      </footer>
    </div>
  );
}

export default AdminLayout;