import { createWorkspaceModalState } from "@/stores";
import { useRecoilState } from "recoil";
import CreateWorkspaceModal from "../workspace/list/CreateWorkspaceModal";

function ModalRenderWrapper({children}: {children: React.ReactNode}){
    const [createWorkspaceModal,  setCreateWorkspaceModal] = useRecoilState(createWorkspaceModalState);
    return (
        <>
        {children}
        {createWorkspaceModal.isOpen ? <CreateWorkspaceModal /> : null}
        </>
    )
}

export default ModalRenderWrapper;