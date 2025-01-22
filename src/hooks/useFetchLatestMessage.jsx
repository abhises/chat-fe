import { ChatContext } from "../context/ChatContext";
import { baseurl, getRequest } from "../utils/services";
import { useContext, useEffect, useState } from "react";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const response = await getRequest(`${baseurl}/message/${chat?._id}`);
      if (response.error) {
        return console.log("Error getting messages ...", response.error);
      }
      const lastMessage = response[response?.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessage();
  }, [newMessage, notifications]);
  return { latestMessage };
};
