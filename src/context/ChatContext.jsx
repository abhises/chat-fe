import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, getRequest, postResquest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  // console.log("user at chat context", user);
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentailChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  console.log("message", messages);

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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseurl}/message/${currentChat?._id}`
      );
      setIsMessagesLoading(false);
      if (response.error) {
        setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something ...");
      // console.log("sender", sender);
      const response = await postResquest(
        `${baseurl}/message`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  console.log("currentchat", currentChat);
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
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
