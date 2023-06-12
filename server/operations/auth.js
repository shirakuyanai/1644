const { config } = require('dotenv');
config();
const bcryptjs = require('bcryptjs');
const {sendEmail} = require('./email')
const {validateEmail, validatePassword} = require('./validate.js')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');

const hashPassword = (password) => {
    const saltRounds = 10; // Number of salt rounds for bcryptjs to generate

    return new Promise((resolve, reject) => {
        bcryptjs.hash(password, saltRounds, (err, hash) => {
        if (err) {
            reject(err); // Reject the promise with the error
        } else {
            resolve(hash); // Resolve the promise with the hash value
        }
        });
    });
};


// Password validation

const compareHash = (password_1, password_2) => {
    return new Promise((resolve, reject) => {
        bcryptjs.compare(password_1, password_2, (err, result) => {
            if (err) {
                // Error during password comparison
                reject(err); // Reject the promise with the error
            } else {
                // Passwords match, login successful
                resolve(result); // Resolve the promise with the hash value
            }
        });
    });
};


const Login = async (req, res) => {
    if (!req.session.user) {
        try {
            let correct_cridentials = false;
            const users = await User.find();
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const correctPassword = await compareHash(req.body.password, user.password);
                if (user.email === req.body.email && correctPassword) {
                    if (!user.verified){
                        console.log('Account has not been verified');
                        correct_cridentials = true;
                        res.status(401).json('Account has not been verified'); // TODO: Add request new verification link in front end
                    }
                    else {
                        req.session.user = user.email;
                        res.json(req.session.user);
                        correct_cridentials = true;
                        break;
                    }
                }
            }
            if (!correct_cridentials) {
                res.status(401).json('Invalid username or password');
                console.log('Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Internal server error');
        }
    } else {
        res.status(401).json('You are already logged in');
        console.log('You are already logged in');
    }
}

const Register = async (req, res) => {
    if (!validateEmail(req.body.email))
    {
        res.status(401).json('Invalid email.');
    }
    else if (!validatePassword(req.body.password))
    {
        res.status(401).json('Invalid password.');
    }
    else
    {
        const users = await User.findOne({ email: req.body.email });

        if (users)
        {
            res.status(401).json('Email taken.');
        }
        else
        {
            const user = new User({
                email: req.body.email,
                password: await hashPassword(req.body.password),
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
            sendEmail(user.email, user._id)
            user.save()
            res.json(user)
        }
    }
}

const changePassword = async (req, res) => {
    try{
        if (req.session.user){
            const loggedIn_user = req.session.user
        
            // const hash_old_password = await hashPassword(req.body.old_password)
            // const hash_new_password = await hashPassword(req.body.new_password)
            // const hash_new_password_2 = await hashPassword(req.body.new_password_2)

            const user = await User.findOne({email: loggedIn_user})

            if (await compareHash(req.body.old_password, user.password)){
                if (req.body.new_password === req.body.new_password_2){
                    user.password = await hashPassword(req.body.new_password)
                    user.save()
                    res.json('Password changed successfully')
                }
                else{
                    res.status(401).json('Passwords don\'t match.')
                }
            }
            else{
                res.status(401).json('Incorrect old password')
            }
        }
        else{
            res.status(401).json('No user logged in')
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

const verifyUser = async (req,res) => {
    try {
        // Verify and decode the token
        const token = await Token.findOne({value: req.params.token})
        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET_KEY);
        if (token.revoked){
            res.json('This token has been revoked.');
        }
        else{
            const user = await User.findOne({id: decodedToken.id})
            user.verified = true
            user.save();
            if (user.verified === true){
                token.revoked = true;
                token.save();
                res.json('You have successfully verified your account.')
            }
            else{
                res.json('An error has occurred. Please try agains.')
            }
        }
      } catch (error) {
        // Token verification failed
        res.json('Token verification failed:' + error.message);
      }
}

module.exports = {Login, Register, verifyUser, changePassword}