const { config } = require('dotenv');
config();
const bcryptjs = require('bcryptjs');
const {sendEmail} = require('./sendmail')
const {validateEmail, validatePassword} = require('./validate')
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

    const checkLoginStatus = async (req, res) => {
        if (req.user) {
            const foundUser = await User.findOne({_id: req.user.id})
            if (foundUser){
                const user = new User({
                    _id: foundUser._id,
                    email: foundUser.email,
                    firstname: foundUser.firstname,
                    lastname: foundUser.lastname,
                    phone: foundUser.phone,
                    role: foundUser.role,
                    verified: foundUser.verified
                })
                res.json(user);
            }else{
                res.json({});
            }
        } else {
            res.json({});
        }
    }


    const generateToken = (user) => {
        const payload = {
            id: user._id,
            role: user.role
        };
        const secretKey = process.env.SESSION_SECRET_KEY;
        const options = { expiresIn: '24h' };
    
        return jwt.sign(payload, secretKey, options);
    };
  
  const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.json({ message: 'Authentication required' });
    }
    
    const secretKey = process.env.SESSION_SECRET_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
        req.user = decoded;
        next();
    });
  };
  
  const Login = async (req, res) => {
    try {
      let correctCredentials = false;
      const users = await User.find();
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const correctPassword = await compareHash(req.body.password, user.password);
        if (user.email === req.body.email && correctPassword) {
            if (!user.status){
                res.status(400).json('Your account has been suspended. Please contact the administrator for more information.');
            } else{
                const token = generateToken(user);
                res.json({ user, token });
            }
            correctCredentials = true;
        }
      }
      if (!correctCredentials) {
        return res.status(401).json('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal server error');
    }
  };
  
  

const Register = async (req, res) => {
    if (!req.body.firstname)
    {
        res.status(400).json('Please enter a first name.');
    }
    else if (!req.body.lastname)
    {
        res.status(400).json('Please enter a last name.');
    }
    else if (!req.body.email)
    {
        res.status(400).json('Please enter an email.');
    }
    else if (!validateEmail(req.body.email))
    {
        res.status(400).json('Invalid email.');
    }
    else if (!req.body.password1 || !req.body.password2)
    {
        res.status(400).json('Please enter password.');
    }
    else if (req.body.password1 !== req.body.password2)
    {
        res.status(400).json('Passwords don\'t match.');
    }
    else if (!validatePassword(req.body.password1))
    {
        res.status(400).json('Invalid password.');
    }
    else
    {
        let user = await User.findOne({ email: req.body.email });

        if (user)
        {
            res.status(400).json('Email taken.');
        }else{
            user = await User.findOne({ phone: req.body.phone });
            if (user)
            {
                res.status(400).json('Phone taken.');
            }
    
            else
            {
                user = new User({
                    email: req.body.email,
                    password: await hashPassword(req.body.password1),
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                })
                user.save()
                sendEmail(user.email, user)
                res.json('Registered successfully!')
            }
        }

        
    }
}

const changePassword = async (req, res) => {
    try{
        if (req.user){
            const user = await User.findOne({_id: req.user.id})
            if (req.body.email === user.email){
                if (await compareHash(req.body.old_password, user.password)){
                    if (req.body.new_password === req.body.new_password_2){
                        user.password = await hashPassword(req.body.new_password)
                        user.save()
                        res.status(400).json('Password changed successfully')
                    }
                    else{
                        res.status(400).json('Passwords don\'t match.')
                    }
                }
                else{
                    res.status(400).json('Incorrect old password')
                }
            }else{
                res.status(400).json('Incorrect email address.')
            }
        }
        else{
            res.status(400).json('No user logged in')
        }
    }
    catch(err){
        res.json(err)
    }
}

const resendVerificationEmail = async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ _id: req.user.id });
  
        if (user.verified) {
          return res.json('Account already verified.');
        }
  
        // const token = new Token({ user: user._id, value: generateToken(user._id) });
        // await token.save();
  
        const send_email_response = sendEmail(user.email, user)
        res.json(send_email_response)
      } else {
        res.status(400).json('No user logged in');
      }
    } catch (error) {
      res.status(500).json('Internal server error');
    }
  };
  

const editUserEmail = async (req, res) => {
    try{
        const checkMail = await User.findOne({ email: req.body.email });

        if (checkMail)
        {
            res.status(400).json('Email taken.');
        }else{
        if (req.user){
            const user = await User.findOne({_id: req.user.id})
            console.log(user.email);
            console.log(req.body.old_Email);

            if (req.body.old_Email === user.email){
                
                if (await compareHash(req.body.old_password, user.password)){
                    
                        user.password = await hashPassword(req.body.old_password)
                        user.email = req.body.email       
                        user.verified = false;     
                        user.save()
            const send_email_response = sendEmail(user.email, user)
            res.json(send_email_response)
                    
                }
                else{
                    res.status(400).json('Incorrect old Email')
                }
            }else{
                res.status(400).json('Incorrect email address or password')
            }
        }
        else{
            res.status(400).json('No user logged in')
        }
    }
    }
    catch(err){
        res.status(400).json(err)
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
            const user = await User.findOne({_id: decodedToken.user._id})
            user.verified = true;
            token.revoked = true;
            user.save();
            if (user.verified){
                token.save();
                res.json('You have successfully verified your account.')
            } else{
                res.json('Something went wrong. Please try again later.')
            }
        }
    } catch (error) {
        // Token verification failed
        res.json('Token verification failed:' + error.message);
    }
}

const checkVerifyStatus = async (req, res) => {
    if (req.user) {
        const foundUser = await User.findOne({_id: req.user.id})
        if (foundUser){
            res.json(foundUser.verified);
        }else{
            res.json(false);
        }
    } else {
        res.json(false);
    }
}

module.exports = {Login, Register, verifyUser, changePassword, checkLoginStatus, authenticateToken, editUserEmail, checkVerifyStatus, resendVerificationEmail}