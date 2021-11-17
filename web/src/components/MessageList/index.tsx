import React, {useEffect, useState} from "react";
import styles from './styles.module.scss';
import LogoImg from '../../assets/logo.svg';
import {api} from "../../services/api";
import {io} from "socket.io-client";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage)
});

export const MessageList: React.FC = () => {
  const [messages, setMessage] = useState<Message[]>([]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessage(oldMessages => [
            messagesQueue[0],
            oldMessages[0],
            oldMessages[1],
          ].filter(Boolean))
          
          messagesQueue.shift();
      }
    }, 3000)
  }, [])
  
  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessage(response.data)
    })
  }, [])
  
  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt={"DoWhile 2021"}/>
      
      <ul className={styles.messageList}>
        {
          messages.map(message => (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name}/>
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))
        }
        
        
      </ul>
    </div>
  )
}