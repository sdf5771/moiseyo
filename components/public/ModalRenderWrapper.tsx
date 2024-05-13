import { createChannelModalState, createWorkspaceModalState } from "@/stores";
import { useRecoilState } from "recoil";
import CreateWorkspaceModal from "../workspace/list/CreateWorkspaceModal";
import CreateChannelModal from "../workspace/workspace-nav-bar/CreateChannelModal";

function ModalRenderWrapper({children}: {children: React.ReactNode}){
    const [createWorkspaceModal,  setCreateWorkspaceModal] = useRecoilState(createWorkspaceModalState);
    const [createChannelModal,  setCreateChannelModal] = useRecoilState(createChannelModalState);
    return (
        <>
        {children}
        {createWorkspaceModal.isOpen ? <CreateWorkspaceModal /> : null}
        {createChannelModal.isOpen ? <CreateChannelModal /> : null}
        </>
    )
}

export default ModalRenderWrapper;