import { getThreeLeggedAccessToken } from '../utils/authentication/ThreeLeggedAccessToken';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useApsAuth = (type = undefined) => {
    const [searchParams] = useSearchParams();

    const [isTokenSet, setIsTokenSet] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const getApsAccessToken = async () => {
        const code = searchParams.get('code');
        if (!code) {
            console.log("error occured");
        }
        console.log(code)
        const data = await getThreeLeggedAccessToken(code);
        localStorage.setItem('apsToken', JSON.stringify(data));
        setIsTokenSet(true);
    };

    const validateAccessToken = async () => {
        const token = localStorage.getItem('apsToken');
        if (!token) return;
        try {
            const { data } = await getThreeLeggedAccessToken(token);
            if (data?.status_code === 400) {
                setIsTokenExpired(true);
                return;
            }
            localStorage.setItem('apsToken', JSON.stringify(data));
            setIsTokenValid(true);
        } catch (e) {
            console.error(e);
            localStorage.removeItem('apsToken');
            setIsTokenValid(false);
        }
    };

    useEffect(() => {
        if (type === 'code') {
            // localStorage.removeItem('apsToken');
            getApsAccessToken();
        }
        if (type === 'refresh') {
            validateAccessToken();
        }
    }, []);

    return { token: localStorage.getItem('apsToken'), isTokenSet, isTokenValid, isTokenExpired, validateAccessToken };
};

export default useApsAuth;
