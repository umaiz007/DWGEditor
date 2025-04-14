import { Button } from '@mui/material';
const { REACT_APP_APS_CLIENT_ID, REACT_APP_CALLBACK_URL } = process.env;

function ApsLogin() {

    function onButtonClick() {
        const url = 'https://developer.api.autodesk.com/authentication/v2/authorize';
        const responseType = 'code';
        const scope = encodeURI('data:read data:write data:create');
        const authUrl = `${url}?response_type=${responseType}&client_id=${REACT_APP_APS_CLIENT_ID}&redirect_uri=${REACT_APP_CALLBACK_URL}&scope=${scope}`;

        window.location.href = authUrl;
    }
    return (<Button variant="contained" onClick={onButtonClick}>Autodesk Login</Button>)

}

export default ApsLogin;