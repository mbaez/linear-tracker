import React, { useContext, useEffect, useRef, useState } from "react";
import { LinearContext } from "../../contexts/LinearContext";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constants/Api";

/**
 * @param {*} props
 */
const Navbar = ({}) => {
  const loading = useRef(false);
  const { getAccessToken, authenticated } = useContext(LinearContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading.current && !user && authenticated()) getUser();
  }, []);

  /**
   * Make a
   */
  const getUser = async () => {
    loading.current = true;
    const response = await fetch(`${API_BASE_URL}/profile/me`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const data = await response.json();
    setUser(data);
    loading.current = false;
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-g host text-xl">
          <i className="fa-solid fa-stopwatch"></i> Time Tracker
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {user && <b>{user.name}</b>}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user && <img alt="" src={user.avatarUrl} />}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
