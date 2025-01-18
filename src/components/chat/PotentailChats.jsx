import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentailChats = () => {
  const { user } = useContext(AuthContext);
  const { potentailChats, createChat, onlineUsers } = useContext(ChatContext);
  // console.log("ChatContext", potentailChats);
  return (
    <>
      <div className="all-users">
        {potentailChats &&
          potentailChats.map((u, index) => {
            return (
              <>
                <div
                  className="single-user"
                  key={index}
                  onClick={() => createChat(user._id, u._id)}>
                  {u.name}
                  <span
                    className={
                      onlineUsers?.some((user) => user?.userId === u?._id)
                        ? "user-online"
                        : ""
                    }></span>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default PotentailChats;
