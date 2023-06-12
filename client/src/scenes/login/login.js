import React, {useEffect, useState} from 'react'

export default function Login(){
    useEffect(() =>{
        changeTitle('Login')
    })

    const changeTitle = (data) => {
        document.title = data;
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            if (email !== '' && password !== ''){
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    email: email,
                    password: password,
                    }),
                    credentials: 'include',
                });
                if (response.ok){
                    const data = await response.json()
                    const token = data.token
                    localStorage.setItem('token', token);
                    window.location.replace('/index');

                }
                else{
                    console.error('Login failed:', await response.json());
                }
            }
            else{
                alert('Please fill out all the required fields');
            }
        }
        catch (err){
            console.error(err);
        }
    }


    return (
        <div className="login-scene">
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={handleLogin} action='#'>
                    <div className="txt_field">
                        <input type="email" name="email" id="inputEmail" autoComplete="Email" required onChange={(event) => setEmail(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputEmail">Email</label>
                    </div>

                    <div className="txt_field">
                        <input type="password" name="password" id="inputPassword" autoComplete="current-password" required onChange={(event) => setPassword(event.target.value)} />
                        <span></span>
                        <label htmlFor="inputPassword" className="pass" >Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" name="_remember_me" /> Remember me
                        </label>
                    </div>
                    <input type="submit" value="Login"/>
                    <div className="signup_link">
                        Not a member? <a href="/register">Click here to register</a>
                    </div>
                </form>
            </div>
        </div>
    )
}