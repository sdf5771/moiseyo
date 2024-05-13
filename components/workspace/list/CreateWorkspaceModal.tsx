'use client';
import { createWorkspaceModalState } from '@/stores';
import styles from './CreateWorkspaceModal.module.css';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { postWorkspaceList } from '@/queries';
import { useMutation } from '@tanstack/react-query';

function CreateWorkspaceModal(){
    const [createWorkspaceModal,  setCreateWorkspaceModal] = useRecoilState(createWorkspaceModalState);
    const [accessToken, setAceessToken] = useState('');
    const [inputValue, setInputValue] = useState('');
    const {mutate: createWorkspace, isPending: createWorkspaceIsPending} = useMutation({
        mutationKey: ['create workspace'],
        mutationFn: postWorkspaceList,
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
        <div className={styles.create_workspace_modal_root}>
            <div className={styles.modal_background}></div>
            <div className={styles.modal_body}>
                <div className={styles.header}>
                    <span className={styles.title}>Create Your Workspace</span>
                </div>
                <div className={styles.input_container}>
                    <input 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)} 
                        placeholder='Enter workspace name..' 
                        value={inputValue}/>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={() => {
                        if(!inputValue){
                            alert('생성할 워크스페이스 이름을 입력해주세요.');
                            return
                        }
                        createWorkspace({workspaceTitle: inputValue, accessToken: accessToken})
                    }}>Create</button>
                    <button onClick={() => setCreateWorkspaceModal({isOpen: false})}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkspaceModal;