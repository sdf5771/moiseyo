'use client';
import styles from './AuthForm.module.css';
import Lottie from 'react-lottie-player';
import mornitorMessageLottie from '@/public/lotties/mornitor_message.json';
import messageWorkLottie from '@/public/lotties/message_work.json';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postCreateUser, postLoginUser } from '@/queries';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authState } from '@/stores';
import useAuth from '@/hooks/useAuth';

const ACCESS_TOKEN_STORAGE_KEY = 'AccessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'RefreshToken';

function AuthForm(){
    const router = useRouter();
    const {userLogOut} = useAuth();
    useEffect(() => {
        userLogOut();
    }, [])
    const [userAuthState, setUserAuthState] = useRecoilState(authState);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
    const [isError, setIsError] = useState(false);
    const [activeForm, setActiveForm] = useState({
        loginForm: true,
        registerForm: false,
    });
    const {mutate: loginUser} = useMutation({
        mutationFn: postLoginUser,
        onError: (error) => {
            console.log(error)

            alert('로그인에 실패했어요.');
        },
        onSuccess: (data) => {
            if(data.code === 200){
                const {accessToken, refreshToken} = data.result;

                setLoginEmail('');
                setLoginPassword('');
                
                localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken)
                localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)

                setUserAuthState({isLoggedIn: true});

                alert('로그인이 완료되었어요.');
                
                router.push('/workspace/list');
            } else if(data.code === 401){
                setLoginEmail('');
                setLoginPassword('');
                setIsError(true);
            } else if(data.code === 422){
                setLoginPassword('');
                setIsError(true);
            } else {
                alert('로그인 서버에 문제가 생겼어요.');
            }
        }
    })
    const {mutate: createUser} = useMutation({
        mutationFn: postCreateUser,
        onError: (error) => {
            console.log(error)

            alert('계정 생성에 실패했어요.');
        },
        onSuccess: (data) => {
            if(data.code === 200){

                setRegisterName('');
                setRegisterEmail('');
                setRegisterPassword('');
                setRegisterPasswordConfirm('');

                alert('계정 생성이 완료되었어요.');
                alert('로그인을 진행해주세요.');

                setActiveForm({
                    loginForm: true,
                    registerForm: false,
                })

                location.reload();
            } else if (data.code === 409){
                alert('작성하신 계정 정보는 이미 존재해요.')
                setRegisterEmail('');
            } else {
                alert('서버에 문제가 생겼어요.');
            }
        }
    })
    return(
        <div className={styles.auth_form_root}>
            <section className={styles.left_section}>
                <div className={styles.text_container}>
                    <div className={styles.title}>
                        <span>Welcome to Moiseyo</span>
                    </div>
                    <div className={styles.description}>
                        <span>실시간 채팅 기능을 통해 팀원들 간의 즉각적인 의사소통을 가능하게 하며, 
                            다양한 채널을 통해 프로젝트 관련 모든 정보를 체계적으로 관리할 수 있도록 합니다. 
                            더 이상 이메일이나 별도의 메시지 앱을 통해 중요한 정보를 찾아 헤맬 필요가 없습니다. 
                            모든 것이 한 곳에 모여 있어, 필요한 정보를 쉽게 찾고, 팀원들과 신속하게 공유해보세요.</span>
                    </div>
                </div>
                <div className={styles.lottie_container}>
                    <Lottie style={{width: 440, height: 440}} loop animationData={messageWorkLottie} play />
                </div>
                <div className={styles.copyright_container}>
                    <span>Developer - seobisback</span>
                    <span>Contact - seobisback@gmail.com</span>
                </div>
            </section>
            <section className={styles.right_section}>
                {
                    activeForm.loginForm ? 
                        <div className={styles.login_form}>
                            <div className={styles.header}>
                                <span>Sign In</span>
                            </div>
                            <div className={styles.input_box}>
                                <div className={styles.email_input}>
                                    <input 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(event.target.value)} 
                                        placeholder='Enter your email address' value={loginEmail}/>
                                </div>
                                <div className={styles.password_input}>
                                    <input 
                                        type="password"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(event.target.value)}
                                        placeholder='Enter password' value={loginPassword}/>
                                </div>
                                <div className={styles.option_btn_container}>
                                    <div className={styles.forgot_password}>
                                        <span>Forgot Password?</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btn_container}>
                                <button onClick={() => {
                                    loginUser({email: loginEmail, password: loginPassword})
                                }} className={styles.login_btn}>LOGIN</button>
                            </div>
                            <div className={styles.register_container}>
                                <span>{`Don't have an account?`}</span>
                                <span onClick={() => {setActiveForm({
                                    loginForm: false,
                                    registerForm: true,
                                })}}>Register</span>
                            </div>
                            {/* <div className={styles.horizontal_line_container}>
                                <div></div>
                                <span>or</span>
                                <div></div>
                            </div> */}
                        </div>
                    : 
                        <div className={styles.login_form}>
                            <div className={styles.header}>
                                <span>Sign Up</span>
                            </div>
                            <div className={styles.input_box}>
                                <div className={styles.name_input}>
                                    <input 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRegisterName(event.target.value)}
                                        placeholder='Name' value={registerName}/>
                                </div>
                                <div className={styles.email_input}>
                                    <input 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRegisterEmail(event.target.value)} 
                                        placeholder='Email address' value={registerEmail}/>
                                </div>
                                <div className={styles.password_input}>
                                    <input 
                                        type="password"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(event.target.value)}
                                        placeholder='Password' value={registerPassword}/>
                                </div>
                                <div className={styles.password_input}>
                                    <input 
                                        type="password"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRegisterPasswordConfirm(event.target.value)}
                                        placeholder='Password Verify' value={registerPasswordConfirm}/>
                                </div>
                            </div>
                            <div className={styles.btn_container}>
                                <button onClick={() => {
                                    createUser({email: registerEmail, password: registerPassword, userName: registerName})
                                }} className={styles.join_us_btn}>Join Us!</button>
                            </div>
                            <div className={styles.register_container}>
                                <span>{`Have an account already?`}</span>
                                <span onClick={() => {setActiveForm({
                                    loginForm: true,
                                    registerForm: false,
                                })}}>Login</span>
                            </div>
                        </div>
                }
            </section>
        </div>
    )
}

export default AuthForm;