import { atom } from "recoil";

export default atom({
    key: 'createWorkspaceModalState',
    default: {
        isOpen: false,
    }
})