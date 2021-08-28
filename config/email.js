const nodemailer = require("nodemailer");
var utils = require('./utils');

// async..await is not allowed in global scope, must use a wrapper
async function SendEmail(req, res, eml) {
    if(eml!=undefined && eml !=null){
        try {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "wqr.iiui@gmail.com", // generated ethereal user
                    pass: "waqar123", // generated ethereal password
                },
            });

            //   let transporter = nodemailer.createTransport({
            //     name: 'example.com',
            //     host: "smtp.ethereal.email",
            //     port: 587,
            //     secure: false, // true for 465, false for other ports
            //     auth: {
            //       user: "rahsaan.walter86@ethereal.email", // generated ethereal user
            //       pass: "DzV9P6c2vrfR2kgxP7", // generated ethereal password
            //     },
            //   });

            const msg = {
                from: '"WAA 👻" <wqr.iiui@gmail.com>', // sender address
                to: eml.to, // list of receivers
                subject: eml.subject, // Subject line
                //text: "Hello world?", // plain text body
                html: eml.html, // html body
            }

            // send mail with defined transport object
            let info = await transporter.sendMail(msg);

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            return 1;
        } catch(err){
            utils.logException(err,req,"Email");   
            return 0;
        }
    } 
    return 0;   
}

SendEmail().catch(function(req, res, eml, err) {
    utils.logException(err,req,"Email");   
    return 0;
});

module.exports={
    SendEmail:SendEmail,
}