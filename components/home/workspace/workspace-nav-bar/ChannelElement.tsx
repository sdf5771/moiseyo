import styles from './ChannelElement.module.css';

type Tprops = {
    title: string;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    alarmNum?: number;
}

function ChannelElement({ title, alarmNum, clickHandler}: Tprops){
    return(
        <div onClick={clickHandler} className={styles.channel_element_root}>
            <div className={styles.channel_info}>
                <span>#</span>
                <span>{title}</span>
            </div>
            {alarmNum ? 
            <div className={styles.alarm}>
                <span>{alarmNum}</span>
            </div>
            : null}
        </div>
    )
}

export default ChannelElement;