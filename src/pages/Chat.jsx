import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentailChats from "../components/chat/PotentailChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatError, updateCurrentChat } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  // console.log("users chat at userChats", userChats);
  return (
    <Container>
      <PotentailChats />
      {userChats?.length < 1 ? null : (
        <div className="d-flex flex-column flex-md-row align-items-start chat-container">
          <div className="messages-box flex-grow-1 pe-3">
            {isUserChatsLoading && <p>Loading chats ...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </div>
          <ChatBox />

          {/* <div className="chatbox-container flex-grow-1"></div> */}
        </div>
      )}
    </Container>
  );
};

export default Chat;
