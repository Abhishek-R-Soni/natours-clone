const nodemailer = require('nodemailer')

class Email {
    constructor(user){
        this.to = user.email
        this.firstName = user.firstName.split(' ')[0]
        this.from = `Abhishek Soni ${process.env.EMAIL_FROM}`
    }

    newTransport(){
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    } 
    
    async sendEmail(){
        //  1. define email options
        const emailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: 'Welcome to the natours API world !!!'
        };
        console.log('emailOptions :', emailOptions)

        //  2. send email
        await this.newTransport().sendMail(emailOptions) // sendMail() is default, used to send mail
    }
};

module.exports = Email;

// older approach
// const sendEmail = async options => {
//     //  1. create a transport
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     });
//     // console.log('transporter :', transporter)

//     //  2. define email options
//     const emailOptions = {
//         from: 'Abhishek Soni <abhisheksoni@mailtrap.io>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     };
//     console.log('emailOptions :', emailOptions)

//     //  3. send email
//     await transporter.sendMail(emailOptions)
// };

// module.exports = sendEmail;

