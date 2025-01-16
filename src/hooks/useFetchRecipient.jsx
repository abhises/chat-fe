import { useEffect, useState } from "react";
import { baseurl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  //   console.log("chat", chat, "user", user);

  const recipientId = chat?.members?.find((id) => id !== user._id);

  //   console.log("recipientId", recipientId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getRequest(`${baseurl}/user/find/${recipientId}`);
      //   console.log("response in hooks", response);
      if (response.error) {
        return setError(response);
      }
      setRecipientUser(response);
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};
