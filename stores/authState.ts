import { atom } from "recoil";

export default atom({
    key: 'authState',
    default: {
        isLoggedIn: false,
        accessToken: '',
    }
})