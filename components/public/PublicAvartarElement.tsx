import Image from "next/image";
import styles from './publicAvartarElement.module.css';
import { IoPeopleOutline } from "react-icons/io5";

type Tprops = {
    color?: string;
}

function PublicAvartarElement({color}: Tprops){
    return (
        <div style={{backgroundColor: color ? color : '#282834'}} className={styles.public_avartar_root}>
            <IoPeopleOutline fontSize={16} color={'#ffffff'}/>
        </div>
    )
}

export default PublicAvartarElement;