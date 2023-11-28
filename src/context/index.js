import { useState, useContext, createContext } from "react";

const defaultValue = {
  auth: null,
};

const MyContext = createContext(defaultValue);

export const StateContext = ({ children }) => {
  const [auth, setAuth] = useState(null);

  return (
    <MyContext.Provider value={{ auth, setAuth }}>
      {children}
    </MyContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(MyContext);

  return { ...context };
};
