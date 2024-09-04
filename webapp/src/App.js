import React from "react";
import { AppRoutes } from "./AppRoutes";
import { LinearContextProvider } from "./contexts/LinearContext";

const App = () => {
  return (
     <LinearContextProvider>
      <AppRoutes />
     </LinearContextProvider>
  );
};

export default App;
