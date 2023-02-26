import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './AblyChatComponent.module.css';

const AblyChatComponent = () => {
  const [currentTimer, setCurrentTimer] = useState("");
  const [channel, ably] = useChannel("chat-demo", (message) => {
    console.log("received message")
    setCurrentTimer(message.data);
  });

  return (
    <div>
      {currentTimer}
    </div>
  )
}

export default AblyChatComponent;