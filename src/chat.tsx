import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Messages, ChatEvents, Commands, PrivateMessage } from "twitch-js";

import { chat } from "./lib/twitch";

interface ChatProps {
  className?: string;
}

const Chat = ({ className }: ChatProps) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const updateScroll = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    let onChatEvent: undefined | ((message: Messages) => void);

    onChatEvent = (message: Messages) => {
      // console.log("New Message:", message);
      if (message.command === Commands.PRIVATE_MESSAGE) {
        setMessages([...messages, message]);
      }
    };

    chat.on(ChatEvents.ALL, onChatEvent);

    const func = async () => {
      await chat.connect();
      await chat.join("isaiahbydayah");
    };
    func();

    return () => {
      chat.off(ChatEvents.ALL, onChatEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useLayoutEffect(() => {
    updateScroll();
  });

  return (
    <div
      className={className}
      ref={chatContainerRef}
      style={{
        flexGrow: 1,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        scrollbarGutter: "unset",
      }}
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message as PrivateMessage} />
      ))}
    </div>
  );
};

interface ChatMessageProps {
  message: PrivateMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div style={{ display: "flex", marginBottom: 16 }}>
      <p style={{ color: message.tags.color }}>{message.username}</p>{" "}
      <p style={{ marginLeft: 8 }}>{message.message}</p>
    </div>
  );
};

export default Chat;
