import { useState, createContext, useCallback } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerInfo, updateRegisterInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
