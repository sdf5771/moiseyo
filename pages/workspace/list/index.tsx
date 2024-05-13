'use client';
import { useEffect, useState } from "react";
import styles from "./List.module.css";
import Image from "next/image";
import { PublicAvartarElement, PublicLoadingElement } from "@/components/public";
import WorkspaceElement from "@/components/workspace/list/WorkspaceElement";
import { getWorkspaceList, postWorkspaceList } from "@/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { authState, createWorkspaceModalState } from "@/stores";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { workspaceListData } from "@/types/workspaceListData";


export default function WorkspaceList() {
  const router = useRouter();
  const {validationAccessTokenAsync, refreshAccessTokenAsync} = useAuth();
  const [accessToken, setAceessToken] = useState('');
  useEffect(() => {
    if(!validationAccessTokenAsync()){
      alert('로그인 정보가 없습니다.');
      router.push('/login');
    }
    const storageTmp = localStorage.getItem('AccessToken')
    
    if(storageTmp){
      setAceessToken(storageTmp)
    }
  }, [])
  const {data: workspaceListData, isLoading: workspaceListIsLoading, isError: workspaceListIsError, refetch: workspaceListRefetch} = useQuery({
    queryKey: ['workspacelist ', accessToken],
    queryFn: () => getWorkspaceList({accessToken: accessToken}),
  })
  const [createWorkspaceModal,  setCreateWorkspaceModal] = useRecoilState(createWorkspaceModalState);
  const [avartar, setAvartar] = useState(null);
  
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>
            <span>Moiseyo</span>
        </div>
        <div className={styles.user_info}>
        {avartar ? 
            <div className={styles.user_avartar}>
                <Image width={30} height={30} src={avartar} alt="avartar" /> 
            </div>
        : <PublicAvartarElement />}
        <div className={styles.username}>
            <span>테스트</span>
        </div>
        </div>
      </div>
      <div className={styles.workspace_section}>
          <div className={styles.workspace_container}>
            <div className={styles.header}>
              <span>Workspace</span>
              <div onClick={() => setCreateWorkspaceModal({isOpen: true})} className={styles.create_workspace_btn}></div>
            </div>
            <div className={styles.list_container}>
              {workspaceListData && workspaceListData.result.workspaceList ? 
              workspaceListData.result.workspaceList.map((item: workspaceListData, index: number) => {
                return <WorkspaceElement 
                  key={item.workspaceTitle + item.createdAt}
                  workspaceId={item.workspaceId}
                  workspaceTitle={item.workspaceTitle}
                  ownerInfo={item.ownerInfo}
                  createdAt={item.createdAt}
                  isAdmin={item.isAdmin}
                  />
              })
              : 
              <div className={styles.empty_workspace}>
                <span>참여한 워크스페이스가 없어요</span>
              </div>
              }
            </div>
          </div>
      </div>
      {workspaceListIsLoading ? <PublicLoadingElement /> : null}
    </main>
  );
}
