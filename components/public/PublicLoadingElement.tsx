import styles from './PublicLoadingElement.module.css';
import Lottie from 'react-lottie-player';
import loadingLottie from '@/public/lotties/loading.json';

function PublicLoadingElement(){
    return (
        <div className={styles.public_loading_element_root}>
            <div className={styles.background}></div>
            <div className={styles.loading}>
                <Lottie style={{width: 360}} loop animationData={loadingLottie} play />
            </div>
        </div>
    )
}

export default PublicLoadingElement