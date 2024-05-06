type Tparams = {
    email: string,
    password: string,
    userName: string
}

async function postCreateUser({email, password, userName}: Tparams){
    let data = {
        email: email,
        password: password,
        userName: userName
    }

    const response = await fetch(`/api/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default postCreateUser;