import { useState, createContext, useCallback, useEffect } from "react";
import { baseurl, postResquest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  //updating register info
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // console.log("loginInfo", loginInfo);

  //update login info
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  //register user
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      setRegisterError(null);
      const response = await postResquest(
        `${baseurl}/user/register`,
        JSON.stringify(registerInfo)
      );
      if (response.error) {
        // console.log("hello", response.message);
        return setRegisterError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      setRegisterLoading(false);
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(false);
      const response = await postResquest(
        `${baseurl}/user/login`,
        JSON.stringify(loginInfo)
      );
      if (response.error) {
        // console.log("hello", response.message);
        setIsLoginLoading(false);
        return setLoginError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      setIsLoginLoading(false);
    },
    [loginInfo]
  );

  // console.log("user", user);
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
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
        logoutUser,
        loginUser,
        updateLoginInfo,
        loginError,
        isLoginLoading,
        loginInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
