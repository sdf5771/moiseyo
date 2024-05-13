type Tparams = {
    accessToken: string,
}

async function getWorkspaceList({accessToken}: Tparams){
    console.log('accessToken ', accessToken);
    const response = await fetch(`/api/workspace/list/get`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export default getWorkspaceList;