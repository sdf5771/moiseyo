type Tparams = {
    accessToken: string,
}

async function getTokenCheck({accessToken}: Tparams){
    const response = await fetch(`/api/tokenCheck`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export default getTokenCheck;