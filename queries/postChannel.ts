type Tparams = {
    channelTitle: string,
    workspaceId: string,
    accessToken: string,
}

async function postChannel({channelTitle, workspaceId, accessToken}: Tparams){
    let data = {
        channelTitle: channelTitle,
        workspaceId: workspaceId,
        accessToken: accessToken,
    }

    const response = await fetch(`/api/channel/post`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default postChannel;