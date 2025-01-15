import { createContext, useEffect, useState } from "react";
import { baseurl, getRequest, postResquest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  // console.log("user at chat context", user);
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatError(null);
        const response = await getRequest(`${baseurl}/chat/${user?._id}`);
        // console.log("userchatresponse", response);
        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);
  return (
    <ChatContext.Provider
      value={{ userChats, isUserChatsLoading, userChatError }}>
      {children}
    </ChatContext.Provider>
  );
};
