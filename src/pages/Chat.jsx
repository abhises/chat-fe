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
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats ...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
