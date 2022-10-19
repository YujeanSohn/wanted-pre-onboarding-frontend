import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Alert.module.css';

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
        <div className={styles.alert}>
            <div>
                <p className={styles.alert_txt}>{msg}</p>
                <button className={styles.close_btn} onClick={redirect}>확인</button>
            </div>
        </div>
    )
}

Alert.propTypes = {
    status: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
}

export default Alert