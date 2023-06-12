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
        if (authenticateToken){
            if (req.user) {
                const user = await User.findOne({_id: req.user.id})
                res.json({ email: user.email });
            } else {
                res.status(200).json({});
            }
        }
    }


    const generateToken = (userId) => {
        const payload = { id: userId };
        const secretKey = process.env.SESSION_SECRET_KEY;
        const options = { expiresIn: '24h' };
    
        return jwt.sign(payload, secretKey, options);
    };
  
  const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
  
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
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
          if (!user.verified) {
            correctCredentials = true;
            return res.status(401).json('Your account has not been verified.');
          } else {
            const token = generateToken(user._id);
            console.log('Logged in successfully!');
            correctCredentials = true;
            return res.json({ user, token });
          }
        }
      }
      if (!correctCredentials) {
        console.log('Invalid username or password');
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
        res.status(401).json('Please enter a first name.');
    }
    else if (!req.body.lastname)
    {
        res.status(401).json('Please enter a last name.');
    }
    else if (!req.body.email)
    {
        res.status(401).json('Please enter an email.');
    }
    else if (!validateEmail(req.body.email))
    {
        res.status(401).json('Invalid email.');
    }
    else if (!req.body.password1 || !req.body.password2)
    {
        res.status(401).json('Please enter password.');
    }
    else if (req.body.password1 !== req.body.password2)
    {
        res.status(401).json('Passwords don\'t match.');
    }
    else if (!validatePassword(req.body.password1))
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
                password: await hashPassword(req.body.password1),
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
            user.save()
            const send_email_response = sendEmail(user.email, user._id)
            res.json(send_email_response)
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

module.exports = {Login, Register, verifyUser, changePassword, checkLoginStatus, authenticateToken}