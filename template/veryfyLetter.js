require('dotenv').config();

const verifyLetter = (verificationToken) =>{
    const { BASE_URL } = process.env
    return `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
}

module.exports = {
    verifyLetter
}