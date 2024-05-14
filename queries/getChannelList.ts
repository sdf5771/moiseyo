type Tparams = {
    accessToken: string,
    workspaceId: string,
}

async function getChannelList({accessToken, workspaceId}: Tparams){
    console.log('accessToken ', accessToken);
    const response = await fetch(`/api/channel/get?wid=${workspaceId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    return response.json();
}

export default getChannelList;