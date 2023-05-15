import React from 'react'
import '../login/style.css'

export default function Login(){
    const changeTitle = (data) => {
        document.title = data;
    }

    return (
        <div className="login-scene">
            <div className="center">
                {changeTitle("Login")}
                <h1>Login</h1>
                <form method="post">
                    <div className="txt_field">
                        <input type="text" name="name" id="inputName" autocomplete="username" required/>
                        <span></span>
                        <label for="inputUsername">Name</label>
                    </div>
                    
                    <div className="txt_field">
                        <input type="text" name="username" id="inputUsername" autocomplete="username" required/>
                        <span></span>
                        <label for="inputUsername">Username</label>
                    </div>

                    <div className="txt_field">
                        <input type="text" name="username" id="inputUsername" autocomplete="username" required/>
                        <span></span>
                        <label for="inputUsername">Email</label>
                    </div>

                    <div className="txt_field">
                        <input type="text" name="username" id="inputUsername" autocomplete="username" required/>
                        <span></span>
                        <label for="inputUsername">Phone</label>
                    </div>

                    <div className="txt_field">
                        <input type="password" name="password" id="inputPassword" autocomplete="current-password" required />
                        <span></span>
                        <label for="inputPassword" className="pass" >Password</label>
                    </div>

                    <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}"/>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" name="_remember_me" /> By signing up to our website, you haved agreed to our <a>Privacy Policies</a>
                        </label>
                    </div>

                    <input type="submit" value="Register"/>
                </form>
                <br/>
            </div>
        </div>
    )
}