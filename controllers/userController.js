// const config = require('../config.json');
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications

// Model Imports
const User = require('../models/user');

exports.register = function(req, res) {
    let userData = req.body

    // Presence Verification
    if (!userData.first_name) {
        return res.status(422).send('Please provide your First Name')
    }
    if (!userData.last_name) {
        return res.status(422).send('Please provide your Last Name')
    }
    if (!userData.email) {
        return res.status(422).send('Please provide your Email Address')
    }
    if (!userData.phone_number) {
        return res.status(422).send('Please provide your Phone Number')
    }
    if (!userData.gender) {
        return res.status(422).send('Please select your Gender')
    }
    if (!userData.birth_date) {
        return res.status(422).send('Please provide your Date of Birth')
    }
    if (!userData.address) {
        return res.status(422).send('Please provide your Residential Address')
    }
    // if (!userData.password) {
    //     return res.status(422).send('Please provide your Password')
    // }

    // // Password Verification
    // if (userData.password != userData.password_confirmation) {
    //     return res.status(422).json('Password & Password Confirmation do not match')
    // }

    // Registered User Check
    User.find(('email', '==', userData.email), function(error, registeredUser) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your registration')
        }

        if (registeredUser) {
            return res.status(422).send('Sorry!! A User with this bio-data already exists.')
        } else {
            let user = new User(userData)
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error)
                } else {
                	console.log(registeredUser)
                    // let payload = { subject: registeredUser._id }
                    // let token = jwt.sign(payload, { expiresIn: "1d" })
                    // res.status(200).send({ token })
                }
            });
        }
    });
}