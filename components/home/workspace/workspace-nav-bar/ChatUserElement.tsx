import styles from './ChatUserElement.module.css';
import Image from 'next/image';
import { PublicAvartarElement } from '@/components/public';

type Tprops = {
    avartar?: string;
    nickname: string;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    alarmNum?: number;
}

function ChatUserElement({avartar, nickname, alarmNum, clickHandler}: Tprops){
    return(
        <div onClick={clickHandler} className={styles.chat_user_element_root}>
            <div className={styles.user_info}>
                {avartar ? 
                    <div className={styles.user_avartar}>
                        <Image src={avartar} alt="avartar" /> 
                    </div>
                : <PublicAvartarElement />}
                <span>{nickname}</span>
            </div>
            {alarmNum ? 
            <div className={styles.alarm}>
                <span>{alarmNum}</span>
            </div>
            : null}
        </div>
    )
}

export default ChatUserElement;