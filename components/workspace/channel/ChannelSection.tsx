'use client';
import ChatInput from '@/components/public/chat/ChatInput';
import styles from './ChannelSection.module.css';
import ChatMessageElement from '../chat/ChatMessageElement';
import { dateFormatFull } from '@/utils/dateFormat';
import SocketIOClient from "socket.io-client";
import { useEffect, useRef, useState } from 'react';
import { PublicLoadingElement } from '@/components/public';

interface IMsg {
  user: string;
  msg: string;
  createAt: string;
}

function ChannelSection(){
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  const textareaRef = useRef<any>(null);
  const [textareaValue, setTextareaValue] = useState('');

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient({
      path: "/api/socket",
      addTrailingSlash: false
    });

    socket.open()
    
    console.log('socket ', socket);
    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      console.log('message ', message);
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (textareaValue) {
      // build message obj
      const message: IMsg = {
        user: 'user_id',
        msg: textareaValue,
        createAt: dateFormatFull(new Date())
      };

      // dispatch message to other users
      const resp = await fetch("/api/socket/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log('resp ', resp);
      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    textareaRef?.current?.focus();
  };

    return(
        <section className={styles.channel_root}>
          <div className={styles.channel_header}>
            <div className={styles.channel_title}>
              <span># Channel</span>
            </div>
          </div>
          <div className={styles.chatlist_container}>
            {
              chat.length !== 0 ?
              chat.map((chatItem, index) => {
                  return <ChatMessageElement key={chatItem.msg + index} nickname={chatItem.user} createAt={chatItem.createAt} chatStr={chatItem.msg}/>
              })
              : 
              <div className={styles.no_message}>
                <span>There is no Message</span>
              </div>
            }
          </div>
          <div className={styles.user_ui_container}>
            <ChatInput ref={textareaRef} textareaValue={textareaValue} setTextareaValue={setTextareaValue} sendMessage={sendMessage} />
          </div>
          {/* {!connected ? <PublicLoadingElement /> : null} */}
        </section>
    )
}

export default ChannelSection;