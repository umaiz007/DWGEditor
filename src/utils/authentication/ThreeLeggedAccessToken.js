const getThreeLeggedAccessToken = (code) => {
    return new Promise((resolve, reject) => {
        if (!code) {
            reject('No authorization code found in URL');
            return;
        }

        const encodedCred = btoa(`${process.env.REACT_APP_APS_CLIENT_ID}:${process.env.REACT_APP_APS_CLIENT_SECRET}`);
        const url = "https://developer.api.autodesk.com/authentication/v2/token";
        const headers = new Headers({
            Authorization: `Basic ${encodedCred}`,
            "Content-Type": "application/x-www-form-urlencoded",
        });

        const body = new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': `${process.env.REACT_APP_CALLBACK_URL}`,
        });

        const options = {
            method: 'POST',
            headers,
            body,
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    reject(data.error_description);
                } else {
                    const expiresInSeconds = data.expires_in;
                    const expiresAt = new Date();
                    expiresAt.setSeconds(expiresAt.getSeconds() + expiresInSeconds);
                    const expireAt = expiresAt.toISOString();
                    const newData = { ...data, 'expires_at': expireAt }
                    // console.log("data", newData)
                    resolve(newData);
                }
            })
            .catch((error) => {
                console.error('Error fetching access token:', error);
                reject(error);
            });
    });
};


export { getThreeLeggedAccessToken };