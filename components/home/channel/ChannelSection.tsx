import ChatInput from '@/components/public/chat/ChatInput';
import styles from './ChannelSection.module.css';
import ChatMessageElement from '../chat/ChatMessageElement';

function ChannelSection(){

    return(
        <section className={styles.channel_root}>
          <div className={styles.channel_header}>
            <div className={styles.channel_title}>
              <span># Channel</span>
            </div>
          </div>
          <div className={styles.chatlist_container}>
            <ChatMessageElement nickname={"Test User01"} createAt={new Date().toString()} chatStr="Test Message01"/>
            <ChatMessageElement nickname={"Test User02"} createAt={new Date().toString()} chatStr="Test Message02"/>
          </div>
          <div className={styles.user_ui_container}>
            <ChatInput />
          </div>
        </section>
    )
}

export default ChannelSection;