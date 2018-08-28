let Validations = require('../utils/Validation');
let Encryption = require('../utils/Encryption');
let EMAIL_REGEX = require('../utils/Email').EMAIL_REGEX;
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('Hazem', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },


});

let  User = sequelize.define('user', {
    id:{

        type: Sequelize.INTEGER,
        primaryKey: true,

    },
    name: Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password: Sequelize.STRING,
    role_id: Sequelize.INTEGER,
    isVerified :Sequelize.BOOLEAN
}, {
    timestamps:false
});

sequelize.sync();


// authenticating sender email
module.exports.login = function (req, res, next) {
    // Check that the body keys are in the expected format and the required fields are there
    var valid =
        req.body.email &&
        Validations.isString(req.body.email) &&
        Validations.matchesRegex(req.body.email, EMAIL_REGEX) &&
        req.body.password &&
        Validations.isString(req.body.password);

    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'email(String and of valid email format) and password(String) are required fields.',
            data: null
        });
    }

    // Find the user with this email from the database
    User.findOne({ where: {email: req.body.email} }).then(user => {
        // if (err) {
        //     return next(err);
        // }
        // If user not found then he/she is not registered
        console.log(user);
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }

        // If user found then check that the password he entered matches the encrypted hash in the database
        Encryption.comparePasswordToHash(req.body.password, user.password, function (err, passwordMatches) {
            if (err) {
                return next(err);
            }
            // If password doesn't match then its incorrect
            if (!passwordMatches) {
                return res
                    .status(401)
                    .json({ err: null, msg: 'Password is incorrect.', data: null });
            }
            // if (user.blocked) {
            //     return res.status(401).json({ err: null, msg: 'Blocked', data: null });
            // }
            if (!user.isVerified) {
                return res.status(401).json({ err: null, msg: ' Please Verify Your Account ', data: null });
            }
            // Create a JWT and put in it the user object from the database
            var token = jwt.sign(
                {
                    user: { id: user.id, name: user.name, email: user.email }
                },
                'lol',
                {
                    expiresIn: '12h'
                }
            );
            res.status(200).json({ err: null, msg: 'Welcome', Token: token });
        });
    });
};


///////////////////////////////////
//the function that register users to the database
module.exports.signup = function (req, res, next) {
    var valid = req.body.username && Validations.isString(req.body.username) &&
        req.body.password && Validations.isString(req.body.password) &&
        req.body.email && Validations.isString(req.body.email) && Validations.matchesRegex(req.body.email, EMAIL_REGEX);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'username (String) , email (String) , and password (String) are required fields.',
            data: null
        });
    }
    req.body.username = req.body.username.trim().replace(/\s+/g, '-');
    User.findOne({ $or: [{ username: { $eq: req.body.username } }, { email: { $eq: req.body.email.trim().toLowerCase() } }] }, function (err, user) {
        if (err)
            throw err;
        if (user == null) {
            var password = req.body.password.trim();
            Encryption.hashPassword(password, function (err, hash) {
                if (err) {
                    return next(err);
                }
                User.create({ name: req.body.name, email: req.body.email.trim().toLowerCase(), password: hash }, function (err, newUser) {
                    if (err) {
                        return next(err);
                    } else {
                        var token = jwt.sign(
                            {
                                user: {
                                    id: newUser.id, email: newUser.email
                                }
                            },
                            'lol',
                            {
                                expiresIn: '2h'
                            }
                        );
                        //insert in verify token tables
                        // here
                        //
                        // Confirmation url which will be sent to user
                        let confirmationUrl = 'https://whatwhynot.net/#/page' + `/verify/${token}`;
                        nodemailerController.sendEmail(
                            req.body.email,
                            'Account Verification Token',
                            'Click the following link to confirm your account:</p>' + confirmationUrl,
                            function (done) {
                                if (done) {
                                    return res.status(201).json({
                                        err: null,
                                        msg: 'Registration successful, you can now login to your account.',
                                        data: null
                                    });
                                } else {
                                    User.remove({ _id: newUser._id }, function (err) {
                                        if (!err) {
                                            return res.status(412).json({
                                                err: null,
                                                msg: 'Registration Failed',
                                                data: null
                                            })
                                        }
                                    })
                                }
                            }
                        )
                    }
                });
            });
        } else
            return res.status(412).json({
                err: null,
                msg: 'Registration Failed',
                data: null
            })
    })
};


/////////////////////////

module.exports.verify = function (req, res, next) {
    // finds a user with verification token appended to the url url
    var valid = req.params.token && Validations.isString(req.params.token);
    if (valid) {
        jwt.verify(req.params.token, 'lol', function (err, decodedToken) {
            if (err) {
                return res.status(401).json({
                    error: err,
                    msg: 'Token Timed Out',
                    data: null
                });
            }
            switch (decodedToken.user.verify) {
                case "Email":
                    User.findOneAndUpdate({ _id: decodedToken.user._id, verificationEmailToken: decodedToken.user.token },
                        { $set: { email: decodedToken.user.email }, $unset: { verificationEmailToken: 1 } },
                        { new: false }, function (err, user) {
                            if (user) {
                                return res.status(200).json({
                                    err: null,
                                    msg: user.email + ' Updated to ' + decodedToken.user.email,
                                    data: null
                                })
                            } else {
                                return res.status(200).json({
                                    err: null,
                                    msg: ' Unable to Verify Email ' + decodedToken.user.email,
                                    data: null
                                })
                            }
                        })
                    break;
                case "Account":
                    User.findOneAndUpdate({ _id: decodedToken.user._id, verificationToken: decodedToken.user.token },
                        { $set: { isVerified: true }, $unset: { verificationToken: 1 } }, { new: true }, function (err, user) {
                            if (user) {
                                return res.status(200).json({
                                    err: null,
                                    msg: user.username + ' Account is now Verified ',
                                    data: null
                                })
                            } else {
                                return res.status(200).json({
                                    err: null,
                                    msg: ' Unable to Verify Account ' + decodedToken.user.email,
                                    data: null
                                })
                            }
                        })
                    break;
                case "Password":
                    Encryption.hashPassword(decodedToken.user.token, function (err, hash) {
                        if (hash) {
                            User.findByIdAndUpdate(decodedToken.user._id, { $set: { password: hash } }, function (err, user) {
                                if (user) {
                                    return res.status(200).json({
                                        err: null,
                                        msg: 'User ' + user.username + ' Password Reseted Successfully',
                                        data: null
                                    })
                                } else {
                                    return res.status(404).json({
                                        err: null,
                                        msg: 'Unable To Find User',
                                        data: null
                                    })
                                }
                            });
                        }
                    });
                    break;
            }
        });
    } else {
        return res.status(422).json({
            err: null,
            msg: 'Invalid Data.',
            data: null
        })
    }
};
