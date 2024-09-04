import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {*} props
 */
const Drawer = ({ children }) => (
  <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {children}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary drawer-button lg:hidden"
      >
        Open drawer
      </label>
    </div>
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <Link to="/issues/my-assignments">
            <i className="fa-solid fa-list-check"></i> Assignee
          </Link>
        </li>
        <li>
          <Link to="/issues/time-entries">
            <i className="fa-solid fa-stopwatch"></i>Time Entries
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Drawer;
