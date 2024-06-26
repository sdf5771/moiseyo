import { useEffect, useState } from 'react';
import styles from './CreateChannelModal.module.css';
import { useRecoilState } from 'recoil';
import { createChannelModalState } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import postChannel from '@/queries/postChannel';

function CreateChannelModal(){
    const [createChannelModal,  setCreateChannelModal] = useRecoilState(createChannelModalState);
    const [accessToken, setAceessToken] = useState('');
    const [inputValue, setInputValue] = useState('');
    const {mutate: createChannel, isPending: createChannelIsPending} = useMutation({
        mutationKey: ['create channel'],
        mutationFn: postChannel,
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    useEffect(() => {
        const storageTmp = localStorage.getItem('AccessToken')
        if(storageTmp){
            setAceessToken(storageTmp)
        }
    }, [])

    return(
        <div className={styles.create_channel_modal_root}>
            <div className={styles.modal_background}></div>
            <div className={styles.modal_body}>
                <div className={styles.header}>
                    <span className={styles.title}>Create Channel</span>
                </div>
                <div className={styles.input_container}>
                    <input 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)} 
                        placeholder='Enter channel name..' 
                        value={inputValue}/>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={() => {
                        if(!inputValue){
                            alert('생성할 채널 이름을 입력해주세요.');
                            return
                        }
                        createChannel({channelTitle: inputValue, accessToken: accessToken, workspaceId: createChannelModal.workspaceId})
                    }}>Create</button>
                    <button onClick={() => setCreateChannelModal({isOpen: false, workspaceId: ''})}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CreateChannelModal;