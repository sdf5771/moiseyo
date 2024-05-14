import { useRouter } from "next/router";


function useErrorHandler () {
    const router = useRouter();
    const errorHandler = (statusCode: number) => {
        switch (statusCode){
            case 401:
                router.push('/login');
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.")
                
                break;
            case 500:
                alert('서버에 문제가 생겼습니다.');
                break;
        }
    }

    return {errorHandler}
}

export default useErrorHandler;