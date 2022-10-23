import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Alert from "../components/Alert";

const Title = styled.h1`
    text-align: center;
`;

const LoginBox = styled.div`
    width: 500px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const LoginInput = styled.input`
    width: 100%;
    height: 50px;
    margin-top: 20px;
`;

const WarningTxt = styled.p`
    font-size: 12px;
    color: tomato;
`;

const BtnBox = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const SubmitBtn = styled.button`
    width: 220px;
    height: 50px;
    background-color: blueviolet;
    color: white;
    border: none;
`;

const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [action, setAction] = useState("");
    const [resp, setResp] = useState(0);
    const [accessToken, setAccessToken] = useState("1234");

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
        <div className="wrapper">
            <LoginBox>
                <Title>TODOS</Title>
                <Title as="h2">로그인</Title>
                <div>
                    <LoginInput
                        value={email} 
                        onChange={updateEmail} 
                        onKeyUp={updateEmail} 
                        type="text" 
                        placeholder="이메일을 입력해주세요."
                    />
                    {
                        isValidEmail? 
                        null: 
                        <WarningTxt>올바른 이메일 주소를 입력해주세요</WarningTxt>
                    }
                </div>
                <div>
                    <LoginInput 
                        value={password} 
                        onChange={updatePassword} 
                        onKeyUp={updatePassword} 
                        type="password" 
                        placeholder="비밀번호를 입력해주세요."
                    />
                    {
                        isValidPassword? 
                        null: 
                        <WarningTxt>비밀번호는 8자 이상 입력해주세요</WarningTxt>
                    }
                </div>
                <BtnBox>
                    <SubmitBtn 
                        onClick={signin} 
                        disabled={!isValidEmail || !isValidPassword}
                    >
                        로그인
                    </SubmitBtn>
                    <SubmitBtn
                        onClick={signup} 
                        disabled={!isValidEmail || !isValidPassword}
                    >
                        회원가입
                    </SubmitBtn>
                </BtnBox>
            </LoginBox>
            {
                resp !== 0? 
                <Alert status={resp} token={accessToken} action={action}/>: 
                null
            }
        </div>
    )
}

export default Home;