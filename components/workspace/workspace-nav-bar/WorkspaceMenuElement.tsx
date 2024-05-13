import { IconType } from 'react-icons/lib';
import styles from './WorkspaceMenuElement.module.css';

type Tprops = {
    Icon: IconType;
    title: string;
    clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    alarmNum?: number;
    isActive: boolean;
}

function WorkspaceMenuElement({Icon, title, alarmNum, clickHandler, isActive}: Tprops){
    return(
        <div onClick={clickHandler} className={`${styles.workspace_menu_element_root} ${isActive ? styles.active : ''}`}>
            <div className={styles.menu_title}>
                <Icon color="#828099" fontSize={16} />
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

export default WorkspaceMenuElement;