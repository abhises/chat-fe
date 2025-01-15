import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, getRequest, postResquest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  // console.log("user at chat context", user);
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentailChats, setPotentialChats] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseurl}/user/getUsers`);
      if (response.error) return console.log("Error fetching users", response);
      // console.log("user response ", response);
      const pchats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pchats);
    };
    getUsers();
  }, [userChats]);

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

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postResquest(
      `${baseurl}/chat`,
      JSON.stringify({ firstId, secondId })
    );
    if (response.error) {
      return console.log("error creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        potentailChats,
        createChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
