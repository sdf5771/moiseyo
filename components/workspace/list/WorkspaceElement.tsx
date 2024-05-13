import { workspaceListData } from '@/types/workspaceListData';
import styles from './WorkspaceElement.module.css';
import  { dateFormatYYMMDD } from '@/utils/dateFormat';
import { useRouter } from 'next/router';

type Tprops = workspaceListData

function WorkspaceElement({workspaceId, workspaceTitle, ownerInfo, createdAt, isAdmin}: Tprops){
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/workspace?wid=${workspaceId}&channel=notice`)} className={styles.workspace_element_root}>
            <div className={styles.workspace_element_header}>
                <span>{workspaceTitle}</span>
            </div>
            <div className={styles.workspace_info_container}>
                <div className={styles.workspace_admin}>
                <span>{ownerInfo?.username} ({ownerInfo?.email})</span>
                </div>
                <div className={styles.created_date}>
                <span>Created : {dateFormatYYMMDD(new Date(createdAt))}</span>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceElement;