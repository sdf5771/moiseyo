import Image from 'next/image';
import styles from './ChatMessageElement.module.css';
import { PublicAvartarElement } from '@/components/public';

type Tprops = {
    nickname: string;
    createAt: string;
    avartar?: string;
    chatStr?: string;
    assets?: [];
}

function ChatMessageElement({nickname, createAt, avartar, chatStr, assets}: Tprops){

    return(
        <div className={styles.chat_message_element_root}>
            <div className={styles.user_info}>
                {avartar ? 
                    <div className={styles.user_avartar}>
                        <Image src={avartar} alt="avartar" /> 
                    </div>
                : <PublicAvartarElement />}
                <div className={styles.author}>
                    <span>{nickname}</span>
                    <span>{createAt}</span>
                </div>
            </div>
            {assets ? 
            <div className={styles.asset_list}>

            </div>
            : null}
            {chatStr ? 
            <div className={styles.chatlog_container}>
                <span>{chatStr}</span>
            </div>
            : null}
        </div>
    )
}

export default ChatMessageElement;