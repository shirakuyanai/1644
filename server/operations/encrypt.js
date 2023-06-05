const crypto = require('crypto');

const encrypt = () => {
    console.log(crypto.randomBytes(32).toString('hex'))
}
module.exports = encrypt