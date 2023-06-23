const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const html = `
<p>Sent</p>
<p>Using NodeMailer</p>
`
// NodeMailer configuration

let mailTransporter = nodemailer.createTransport({
service: 'Gmail',
auth: {
    type: 'login',
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
}
})


const generateToken = async (user) => {
    
    const secretKey = process.env.TOKEN_SECRET_KEY;
    const token = jwt.sign({user}, secretKey, { expiresIn: '5m' });
    const new_token = new Token({
        value: token,
    })
    new_token.save()
    return token
}


const sendEmail = async (recipient, user) => {
    const token = await generateToken(user)
    let details = {
        from: process.env.GMAIL_USER,
        to: recipient,
        subject: 'Noreply',
        text: 'Please click here to verify your account: https://atn-toy-server.onrender.com/verify/'+ token,
    }
    mailTransporter.sendMail(details,(err) => {
        if (err) {
            console.log(err)
            res.json(err)
        }
        else
        {
            console.log('A verification email has been sent to ' + recipient +'. Please check your email and click the link to verify your account.')
            res.json('A verification email has been sent to ' + recipient +'. Please check your email and click the link to verify your account.')
        }
    })
}

module.exports = {sendEmail}