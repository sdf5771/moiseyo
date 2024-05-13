type Tprams = {
    refreshToken: string
}

async function postRefreshToken({refreshToken}: Tprams){
    let data = {
        refreshToken
    }

    const response = await fetch(`/api/refreshtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default postRefreshToken;