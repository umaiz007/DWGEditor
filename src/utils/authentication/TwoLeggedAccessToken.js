const getTwoLeggedAccessToken = (callback) => {

    const encodedCred = btoa(`${process.env.REACT_APP_APS_CLIENT_ID}:${process.env.REACT_APP_APS_CLIENT_SECRET}`);

    const url = 'https://developer.api.autodesk.com/authentication/v2/token'
    const headers = new Headers({
        Authorization: `Basic ${encodedCred}`,
        "Content-Type": "application/x-www-form-urlencoded",
    });

    const body = new URLSearchParams({
        'grant_type': 'client_credentials',
        'scope': 'data:read',
    });

    const options = {
        method: 'POST',
        headers: headers,
        body: body,
    };

    fetch(url, options).then((response) => response.json()).then((data) => {
        callback(data.access_token, data.expires_in);
    })
        .catch((error) => {
            console.error('Error fetching access token:', error);
        });

};

export { getTwoLeggedAccessToken };