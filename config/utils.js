var fs = require('fs');
var dateFormat = require("dateformat");
const nodemailer = require("nodemailer");
//const eml = require('./email');

function writeToFile(data){
    var fileName = "error_log/" + dateFormat(new Date(), "yyyy_mm_dd") + '.log';
    fs.access(fileName, (err) => {
        if (!err) {
            console.log('myfile exists');
            fs.appendFile(fileName, data, function(err, result) {
                if(err) console.log('error', err);
            });
            return;
        }
        console.log('myfile does not exist');
        fs.writeFile(fileName, data, function(err, result) {
            if(err) console.log('error', err);
        });
    });
}

async function SendEmail(eml) {
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
        } catch(error){
            var data= "DATE:\t" + dateFormat() + "\r\n";
            data += "ERROR:\t Email Not Sent. " + error + "\r\n";
            data += "STACK:\t" + JSON.stringify(error, Object.getOwnPropertyNames(error))  + "\r\n";
            data += "NOTE:\t" + "utils.SendEmail" + "\r\n";
            data += "------------------------------------------------------------------------------------------------------------" + "\r\n\r\n";
            writeToFile(data);
        }
    }    
}

SendEmail().catch(function(error) {
    var data= "DATE:\t" + dateFormat() + "\r\n";
    data += "ERROR:\t Email Not Sent. " + error + "\r\n";
    data += "STACK:\t" + JSON.stringify(error, Object.getOwnPropertyNames(error))  + "\r\n";
    data += "NOTE:\t" + "utils.SendEmail" + "\r\n";
    data += "------------------------------------------------------------------------------------------------------------" + "\r\n\r\n";
    writeToFile(data);
});

function logException(error, req=null, msg = "") {
    var data= "DATE:\t" + dateFormat() + "\r\n";
    data += "ERROR:\t" + error + "\r\n";
    data += "STACK:\t" + JSON.stringify(error, Object.getOwnPropertyNames(error))  + "\r\n";
    if(msg != ""){
        data += "NOTE:\t" + msg + "\r\n";
    }
    if(req != null){
        if(req.ip != undefined && req.ip != null && req.ip != ""){
            data += "IP:\t" + req.ip + "\r\n";
        }
        if(req.user != undefined && req.user != null && req.user != ""){
            data += "USER:\t" + req.user.username + "\r\n";
        }
        if(req.body != undefined && req.body != null){
            var jsndata = JSON.stringify(req.body);
            if(jsndata !== '{}'){
                data += "INPUT:\t" + jsndata + "\r\n";
            }            
        }
    }    
    data += "------------------------------------------------------------------------------------------------------------" + "\r\n\r\n";
    writeToFile(data);
    var emldata = data.replace(/\r\n/g, "<br /><br />");
    var msg = {
        to: "wqr.chicsol@gmail.com",
        subject: "Hello ✔",
        html: emldata,
      };
    SendEmail(msg);
}


module.exports={
    logException:logException,
}
