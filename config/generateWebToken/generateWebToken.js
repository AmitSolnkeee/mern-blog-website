const jwt = require('jsonwebtoken');

const generateWebToken = id => {
    return jwt.sign({id} , process.env.JWT_TOKEN , {expiresIn : "20d"})
}

module.exports = generateWebToken ;