import { useState, createContext, useCallback } from "react";
import { baseurl, postResquest } from "../utils/services";

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
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError(null);
    const response = await postResquest(
      `${baseurl}/user/register`,
      JSON.stringify(registerInfo)
    );
    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerInfo,
        updateRegisterInfo,
        registerError,
        setRegisterError,
        isRegisterLoading,
        setRegisterLoading,
        registerUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
