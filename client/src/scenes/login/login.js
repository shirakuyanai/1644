import React, {useEffect} from 'react'

export default function Login(){
    useEffect(() =>{
        changeTitle('Login')
    })

    const changeTitle = (data) => {
        document.title = data;
    }


    return (
        <div className="login-scene">
            <div className="center">
                <h1>Login</h1>
                <form method="post">
                    <div className="txt_field">
                        <input type="text" name="username" id="inputUsername" autocomplete="username" required/>
                        <span></span>
                        <label for="inputUsername">Username</label>
                    </div>

                    <div className="txt_field">
                        <input type="password" name="password" id="inputPassword" autocomplete="current-password" required />
                        <span></span>
                        <label for="inputPassword" className="pass" >Password</label>
                    </div>

                    <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}"/>

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