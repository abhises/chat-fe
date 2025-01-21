import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.avif";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";

const UserChat = ({ chat, user }) => {
  // console.log("userchat inside userchat", user);
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications } = useContext(ChatContext);

  const unreadNotificaions = unreadNotificationsFunc(notifications);
  const thisUserNotification = unreadNotificaions?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  // console.log("recipientUser", recipientUser);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button">
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">12/12/2022</div>
          <div
            className={
              thisUserNotification?.length > 0 ? "this-user-notifications" : ""
            }>
            {thisUserNotification?.length > 0
              ? thisUserNotification?.length
              : ""}
            <span className={isOnline ? "user-online" : ""}></span>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default UserChat;
