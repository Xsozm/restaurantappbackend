var nodemailer = require('nodemailer');
module.exports.sendEmail = function ( to , subject , html , done) {
    nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'lost.found.guc@gmail.com',
            pass: '267788954'
        }
    }).sendMail({
        from: 'TriadaSystemAdmin@gmail.com',
        to: to ,
        subject: subject,
        html: html ,
    } , ( err , result ) => {
        if(err) {
            return done(false);
        } else {
            return done(true);
        }
    });
}