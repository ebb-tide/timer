import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './AblyChatComponent.module.css';

const AblyChatComponent = () => {

  let inputBox = null;
  const [messageText, setMessageText] = useState("1");
  const [receivedMessages, setMessages] = useState([{"data": "ready"}]);

  const [channel, ably] = useChannel("chat-demo", (message) => {
    console.log("received message")
    setMessages([message]);
  });

  const sendChatMessage = (messageText) => {
    console.log("sendChatMessage", messageText)
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("1");
  }

  const handleFormSubmission = (event) => {
    console.log("handleFormSubmission")

    event.preventDefault();
    sendChatMessage(messageText);
  }

  const messages = receivedMessages.map((message, index) => {
    // const author = message.connectionId === ably.connection.id ? "me" : "other";
    return <span key={index} className={styles.message} data-author={"me"}>{message.data}</span>;
  });

  return (
    <div>
      <div>
        {messages}
      </div>

      <div>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
        ></textarea>
      </div>

      <div>
        <button onClick={() => {
          sendChatMessage(String(Number(messageText) * 60 * 60 * 1000))
        }}>+1 Hour</button>
        <button onClick={() => {
          sendChatMessage(String(Number(messageText) * 24 * 60 * 60 * 1000))
        }}>+1 Day</button>
      </div>
      <div>
        <button onClick={() => {
          sendChatMessage(String(Number(messageText) * -60 * 60 * 1000))
        }}>-1 Hour</button>
        <button onClick={() => {
          sendChatMessage(String(Number(messageText) * -24 * 60 * 60 * 1000))
        }}>-1 Day</button>
      </div>
    </div>
  )
}

export default AblyChatComponent;