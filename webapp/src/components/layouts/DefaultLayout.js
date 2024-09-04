import React, { useContext } from "react";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../ui/Navbar";
import Drawer from "../ui/Drawer";
import { LinearContext } from "../../contexts/LinearContext";

const DefaultLayout = () => {
  const { authenticated } = useContext(LinearContext);
  return (
    <>
      <ToastContainer newestOnTop={true} closeOnClick={true} />
      <Navbar />
      {authenticated() ? (
        <Drawer>
          <Outlet />
        </Drawer>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default DefaultLayout;
