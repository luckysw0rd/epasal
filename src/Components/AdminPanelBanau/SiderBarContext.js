// SiderBarContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const SiderBarContext = createContext();

// Create a provider component
export const SiderBarProvider = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <SiderBarContext.Provider value={{ open, setOpen }}>
      {children}
    </SiderBarContext.Provider>
  );
};

// Create a custom hook to use the SiderBarContext
export const useSiderBar = () => {
  return useContext(SiderBarContext);
};
