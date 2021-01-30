import { message as Message } from "antd";

export const message = (type, messageText, duration) => {
  return Message[type]({
    content: messageText,
    duration: duration,
    style: {
      marginTop: "50px",
    },
  });
};
