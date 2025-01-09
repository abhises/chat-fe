import { createContext, useState } from "react";
import { baseurl, getRequest, postResquest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, sstUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  return (
    <ChatContext.Provider
      value={(userChats, isUserChatsLoading, userChatError)}>
      {children}
    </ChatContext.Provider>
  );
};
