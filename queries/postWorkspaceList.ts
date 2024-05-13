type Tparams = {
    workspaceTitle: string,
    accessToken: string,
}

async function postWorkspaceList({workspaceTitle, accessToken}: Tparams){
    let data = {
        workspaceTitle: workspaceTitle,
        accessToken: accessToken,
    }

    const response = await fetch(`/api/workspace/list/post`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default postWorkspaceList;