import React from "react";
import { Link } from "react-router-dom";

function headNavigation() {
  return (
    <header className="header">
      <Link to="" className="link-categoryPageRef">
        <img src="images/aarhusTechLogo.png" alt="" />
      </Link>

      <nav className="navigation">
        <ul>
          <li>
            <Link to="" className="link-categoryPageRef">Home</Link>
          </li>
          <li>
            <Link to="mypage" className="link-categoryPageRef">My page</Link>
          </li>
          <li>
            <Link to="admin" className="link-categoryPageRef">Admin page</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default headNavigation;
