import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
const Chat = () => {
  const { userChats, isUserChatsLoading, userChatError } =
    useContext(ChatContext);

  console.log("logs", userChats);
  return <div>Chat</div>;
};

export default Chat;
