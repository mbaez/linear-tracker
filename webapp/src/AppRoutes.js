import React, { useContext, useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Home from "./components/Home";

import Callback from "./components/Callback";
import MyAssignments from "./components/Issues/MyAssignments";
import TimeEntries from "./components/Issues/TimeEntries";
import { LinearContext } from "./contexts/LinearContext";

export const AppRoutes = () => {
  const { authenticated } = useContext(LinearContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/callback">
            <Route index element={<Callback />} />
          </Route>
          {authenticated() && (
            <Route path="/issues">
              <Route path="my-assignments" element={<MyAssignments />} />
              <Route path="time-entries" element={<TimeEntries />} />
            </Route>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
