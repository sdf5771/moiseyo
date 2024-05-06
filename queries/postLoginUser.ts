type Tparams = {
    email: string,
    password: string,
}

async function postLoginUser({email, password}: Tparams){
    let data = {
        email: email,
        password: password,
    }

    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default postLoginUser;