import React, { useEffect, useState } from 'react';
import styles from './WorkspaceNavBar.module.css';
import { IoRocketOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiPlusSm } from "react-icons/hi";
import WorkspaceMenuElement from './WorkspaceMenuElement';
import ChatUserElement from './ChatUserElement';
import ChannelElement from './ChannelElement';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { createChannelModalState } from '@/stores';

function WorkspaceNavBar(){
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState('');
    const [workspaceId, setWorkspaceId] = useState('');
    const [createChannelModal,  setCreateChannelModal] = useRecoilState(createChannelModalState);
    useEffect(() => {
        if(router.query.channel && typeof(router.query.channel) === 'string'){
            setActiveMenu(router.query.channel)
        }

        if(router.query.wid && typeof(router.query.wid) === 'string'){
            setWorkspaceId(router.query.wid)
        }
    }, [router])
    return (
        <div className={styles.workspace_nav_bar_root}>
            <div className={styles.nav_bar_header}>
                <div className={styles.workspace_title}>
                    <IoRocketOutline color="#060606" fontSize={20} />
                    <span>Workspace Title</span>
                </div>
                <div className={styles.menulist_container}>
                    <WorkspaceMenuElement 
                        Icon={IoIosNotificationsOutline} 
                        title="Notice" 
                        alarmNum={12}
                        clickHandler={(event: React.MouseEvent<HTMLDivElement>) => {
                            router.push(`/workspace?wid=${workspaceId}&channel=notice`)
                        }}
                        isActive={activeMenu === 'notice' ? true : false} />
                    <WorkspaceMenuElement 
                        Icon={IoSettingsOutline} 
                        title="Settings" 
                        clickHandler={(event: React.MouseEvent<HTMLDivElement>) => {
                            router.push(`/workspace?wid=${workspaceId}&channel=settings`)
                        }}
                        isActive={activeMenu === 'settings' ? true : false} />
                </div>
            </div>
            <div className={styles.line_horizontal}></div>
            <div className={styles.channel_list_container}>
                <div className={styles.channel_list_header}>
                    <span className={styles.title}>CHANNEL LIST</span>
                    <div onClick={() => setCreateChannelModal({isOpen: true})} className={styles.new_channel_btn}>
                        <HiPlusSm color="#828099" fontSize={20} />
                    </div>
                </div>
                <div className={styles.channel_list}>
                    <ChannelElement title={"Test Channel 01"} alarmNum={2} clickHandler={() => {}} />
                    <ChannelElement title={"Test Channel 02"} alarmNum={2} clickHandler={() => {}} />
                    <ChannelElement title={"Test Channel 03"} alarmNum={2} clickHandler={() => {}} />
                </div>
            </div>
            <div className={styles.line_horizontal}></div>
            <div className={styles.chatlist_container}>
                <div className={styles.chatlist_header}>
                    <span className={styles.title}>CHATLIST</span>
                    <div className={styles.new_chat_btn}>
                        <HiPlusSm color="#828099" fontSize={20} />
                    </div>
                </div>
                <div className={styles.chat_user_list}>
                    <ChatUserElement nickname={'Test User'} alarmNum={23} clickHandler={() => {}}/>
                    <ChatUserElement nickname={'Test User2'} alarmNum={23} clickHandler={() => {}}/>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceNavBar;