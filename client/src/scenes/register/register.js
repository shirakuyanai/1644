import React, {useEffect, useState} from 'react'
// import {Register_Success} from '../register_success'

export default function Register(){
    useEffect(() =>{
        changeTitle('Register')
    })

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const changeTitle = (data) => {
        document.title = data;
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try{
            if (firstname === '' || lastname === '' || email === '' || password1 === '' || password2 === '') {
                alert('Please fill out all the required fields');
            }
            else{
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password1: password1,
                        password2: password2,
                    }),
                    credentials: 'include'
                })
                console.log(response.json())
                if (response.ok){
                    window.location.replace('/register_success')
                }
            }
        }
        catch(ex){
            console.error(ex)
        }
    }

    return (
        <div className="login-scene">
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={handleRegister} action='#'>
                    <div className="txt_field">
                        <input type="text" name="firstname" id="inputFirstname" autoComplete="firstname" required onChange={(event) => setFirstName(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputFirstname">First Name</label>
                    </div>
                    
                    <div className="txt_field">
                        <input type="text" name="lastname" id="inputLastname" autoComplete="lastname" required onChange={(event) => setLastName(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputLastname">Last Name</label>
                    </div>

                    <div className="txt_field">
                        <input type="email" name="email" id="inputEmail" autoComplete="email" required onChange={(event) => setEmail(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputEmail">Email</label>
                    </div>

                    {/* <div className="txt_field">
                        <input type="text" name="phone" id="inputPhone" autoComplete="phone" required onChange={(event) => setPhone(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputPhone">Phone</label>
                    </div> */}

                    <div className="txt_field">
                        <input type="password" name="passwor1" id="inputPassword1" autoComplete="current-password" required onChange={(event) => setPassword1(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputPassword1" className="pass" >Password</label>
                    </div>
                    
                    <div className="txt_field">
                        <input type="password" name="password2" id="inputPassword2" required onChange={(event) => setPassword2(event.target.value)}/>
                        <span></span>
                        <label htmlFor="inputPassword2" className="pass" >Retype Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" name="_remember_me" /> By signing up to our website, you haved agreed to our <a href='#'>Privacy Policies</a>
                        </label>
                    </div>

                    <input type="submit" value="Register"/>
                </form>
                <br/>
            </div>
        </div>
    )
}