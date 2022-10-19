import { useState } from "react";
import axios from "axios";

import styles from "./Home.module.css";
import Alert from "../components/Alert";

const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [action, setAction] = useState("");
    const [resp, setResp] = useState(0);
    const [accessToken, setAccessToken] = useState("");

    const signup = async() => {
        try {
            setAction("signup");

            const params = {
                "email": email,
                "password": password
            };

            const resp = await axios.post("https://pre-onboarding-selection-task.shop/auth/signup", params);
            setResp(resp.status);
            setAccessToken(resp.data.access_token);
        } catch(e) {
            setResp(e.response.status);
        }
    }

    const signin = async() => {
        try {
            setAction("signin");

            const data = {
                "email": email,
                "password": password
            };

            const resp = await axios.post("https://pre-onboarding-selection-task.shop/auth/signin", data);
            setResp(resp.status);
            setAccessToken(resp.data.access_token);
        } catch(e) {
            setResp(e.response.status);
        }
    }

    const updateEmail = (event) => {
        setEmail(event.target.value);

        if(!email.includes("@")) {
            setIsValidEmail(false);
            return;
        }

        setIsValidEmail(true);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);

        if(password.length < 8) {
            setIsValidPassword(false);
            return;
        }

        setIsValidPassword(true);
    }

    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                <h1>TODOS</h1>
                <h2>로그인</h2>
                <div>
                    <input
                        className={styles.login_input} 
                        value={email} 
                        onChange={updateEmail} 
                        onKeyUp={updateEmail} 
                        type="text" 
                        placeholder="이메일을 입력해주세요."
                    />
                    {
                        isValidEmail? 
                        null: 
                        <p className={styles.warning}>올바른 이메일 주소를 입력해주세요</p>
                    }
                </div>
                <div>
                    <input
                        className={styles.login_input}  
                        value={password} 
                        onChange={updatePassword} 
                        onKeyUp={updatePassword} 
                        type="password" 
                        placeholder="비밀번호를 입력해주세요."
                    />
                    {
                        isValidPassword? 
                        null: 
                        <p className={styles.warning}>비밀번호는 8자 이상 입력해주세요</p>
                    }
                </div>
                <div className={styles.btn_content}>
                    <button
                        className={styles.submit_btn} 
                        onClick={signin} 
                        disabled={!isValidEmail || !isValidPassword}
                    >
                        로그인
                    </button>
                    <button
                        className={styles.submit_btn}  
                        onClick={signup} 
                        disabled={!isValidEmail || !isValidPassword}
                    >
                        회원가입
                    </button>
                </div>
            </div>
            {
                resp !== 0? 
                <Alert status={resp} token={accessToken} action={action}/>: 
                null
            }
        </div>
    )
}

export default Home;