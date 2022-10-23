import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AlertBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;
    margin-left: -300px;
    width: 600px;
    height: 200px;
    background-color: white;
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.2);
`;

const AlertTxt = styled.p`
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
`;

const Btn = styled.button`
    position: absolute;
    bottom: 10px;
    left: 190px;
    width: 220px;
    height: 50px;
    background-color: blueviolet;
    text-align: center;
    line-height: 30px;
    color: white;
`;

const Alert = ({status, token, action}) => {
    const [msg, setMsg] = useState("");
    useEffect(() => getMsg(), [status]);
    const history = useHistory();
    
    const getMsg = () => {
        switch(status) {
            case 200:
                setMsg(`${action}이 완료되었습니다.`);
                break;
            case 201:
                setMsg(`${action}이 완료되었습니다.`);
                break;
            case 401:
                if (action === 'signin') {
                    setMsg(`회원가입을 먼저 진행해주세요.`);
                } else {
                    setMsg(`권한이 없습니다. 로그인 화면으로 이동합니다.`);
                }
                break;
            default:
                setMsg(`${action} 진행 중 문제가 발생했습니다. 다시 시도해주세요.`);
        }
    }

    const redirect = () => {
        if (status > 200) {
            window.location.reload("/");
            return;
        }

        history.push({pathname: "/todo", state: {token}});
    }

    return (
        <AlertBox>
            <div>
                <AlertTxt>{msg}</AlertTxt>
                <Btn onClick={redirect}>확인</Btn>
            </div>
        </AlertBox>
    )
}

Alert.propTypes = {
    status: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
}

export default Alert