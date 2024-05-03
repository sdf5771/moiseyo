import Image from 'next/image';
import styles from './ChatInput.module.css';
import PublicAvartarElement from '../PublicAvartarElement';
import { TbSend } from "react-icons/tb";
import React, { Dispatch, SetStateAction } from 'react';
type Tprops = {
    avartar?: string;
    textareaValue: string;
    setTextareaValue: Dispatch<SetStateAction<string>>;
    sendMessage: () => void
}

const ChatInput = React.forwardRef(({avartar, textareaValue, setTextareaValue, sendMessage}: Tprops, ref: any) => { 
    return(
        <div className={styles.chat_input_root}>
            <div className={styles.user_info}>
            {avartar ? 
                <div className={styles.user_avartar}>
                    <Image width={30} height={30} src={avartar} alt="avartar" /> 
                </div>
            : <PublicAvartarElement />}
            </div>
            <div className={styles.input_container}>
                <textarea 
                value={textareaValue}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setTextareaValue(event.target.value);
                }} 
                onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if(event.key === 'Enter' && !event.shiftKey){
                        event.preventDefault();
                        sendMessage()
                        setTextareaValue('');
                    }
                }} ref={ref} placeholder="Start a post..." />
                <div onClick={() => {
                    if(!textareaValue) return
                    sendMessage()
                    setTextareaValue('');
                }} className={styles.send_btn}>
                    <TbSend fontSize={16} color={"#0D0D10"}/>
                </div>
            </div>
        </div>
    )
})

ChatInput.displayName = 'ChatInput'; // Display name을 지정

export default ChatInput;