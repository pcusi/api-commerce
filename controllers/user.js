const User = require('../models/User');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || '!"#$%&/()=';


async function newUser(req, res) {

    let { email, password, password_confirm } = req.body;

    if (!email || !password) {

        return res.status(201)
            .send({ message: "Email and password is required for create your account" });

    }

    if (password == password_confirm) {

        let crypt = await bcrypt.hash(password, 10);

        let created_at = moment().unix();

        if (crypt) {

            let user = new User({
                email: email,
                password: crypt,
                created_at: created_at,
            });

            await user.save().then(user => {

                return res.status(200)
                    .send({ message: "user created", user: user.user, _id: user._id });

            }).catch(err => {

                if (err.code == 11000) {

                    return res.status(500).send({ message: 'DUPLICATED', duplicated: err.keyValue });

                }

            });

        } else {

            return res.status(400)
                .send({ message: "Any password can't be crypted" });

        }

    } else {

        return res.status(400)
            .send({ message: "The passwords are not correct" })

    }

}

async function signIn(req, res) {

    let { email, password_valid } = req.body;

    let user = await User.findOne({ email: email });

    var payload = {

        sub: user._id,
        messsage: 'logged',
        private: 'ePrivate'

    }

    let token = jwt.sign(payload, secret, { expiresIn: '1d' });

    user ? bcrypt.compare(password_valid, user.password_valid).then(access => {

        access ? res.status(200).send({ user, access, token }) : res.status(201).send({ message: 'Password incorrect' })

    })
        : res.status(500).send({ message: 'Account not found' });

}

module.exports = {
    newUser,
    signIn
}