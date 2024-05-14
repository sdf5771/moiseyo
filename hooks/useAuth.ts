import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { getTokenCheck, postRefreshToken } from '@/queries';
import { useRecoilState } from 'recoil';
import { authState } from '@/stores';

const ACCESS_TOKEN_STORAGE_KEY = 'AccessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'RefreshToken';

type TresponseData = {
    code: number,
    message: string,
    result?: {
        accessToken: string
    },
    status: string,
}

function useAuth(){
    const [userAuthState, setUserAuthState] = useRecoilState(authState);
    const {mutate: checkAccessToken, mutateAsync: checkAccessTokenAsync} = useMutation({
        mutationFn: getTokenCheck,
        onSuccess: (data: TresponseData, variables) => {
            if(data.code === 200){
                setUserAuthState({isLoggedIn: true, accessToken: variables.accessToken});
            } else if(data.code === 401){
                // AccessToken이 만료되었으므로 RefreshToken으로 AccessToken 재발급 요청
                refreshAccessToken();
            }
        },
        onError: (error) => {
            console.log(error);
            location.reload();
        }
    })

    const userLogOut = () => {
        setUserAuthState({isLoggedIn: false, accessToken: ''});
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    }

    const {mutate: reqPostRefreshToken,  mutateAsync: reqPostRefreshTokenAsync} = useMutation({
        mutationFn: postRefreshToken,
        onSuccess: (data: TresponseData) => {
            if(data.code === 200 && data.result){
                localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.result.accessToken);
            }

            if(data.code === 401){
                // Refresh Token이 만료되었으므로 다시 로그인 요청
                userLogOut();
                alert('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
            }
        },
        onError: (error) => {
            console.error(error);
            location.reload();
        }
    })

    const validationAccessToken = () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

        if(accessToken){
            checkAccessToken({accessToken: accessToken})
        }
    }

    const validationAccessTokenAsync = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

        if(accessToken){
            let result = await checkAccessTokenAsync({accessToken: accessToken})
            
            if(result.code === 200){
                return true
            } else {
                return false
            }
        }
    }

    const refreshAccessToken = () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

        if(refreshToken){
            reqPostRefreshToken({refreshToken})
        } else {
            userLogOut();
        }
    }

    const refreshAccessTokenAsync = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

        if(refreshToken){
            let result = await reqPostRefreshTokenAsync({refreshToken})

            if(result.code === 200){
                return true
            } else {
                return false
            }
        } else {
            userLogOut();
        }
    }

    return {
        validationAccessToken,
        refreshAccessToken,
        validationAccessTokenAsync,
        refreshAccessTokenAsync,
        userLogOut
    }
}

export default useAuth;