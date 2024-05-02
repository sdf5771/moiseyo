import Image from 'next/image';
import styles from './ChatInput.module.css';
import PublicAvartarElement from '../PublicAvartarElement';
import { TbSend } from "react-icons/tb";
type Tprops = {
    avartar?: string;
}

function ChatInput({avartar}: Tprops){ 
    return(
        <div className={styles.chat_input_root}>
            <div className={styles.user_info}>
            {avartar ? 
                <div className={styles.user_avartar}>
                    <Image src={avartar} alt="avartar" /> 
                </div>
            : <PublicAvartarElement />}
            </div>
            <div className={styles.input_container}>
                <textarea placeholder="Start a post..." />
                <div className={styles.send_btn}>
                    <TbSend fontSize={16} color={"#0D0D10"}/>
                </div>
            </div>
        </div>
    )
}

export default ChatInput;