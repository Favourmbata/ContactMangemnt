const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transfer = nodeMailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD,


    },

});
module.exports = transfer;