const express = require('express');
//const { signup } = require('../controller/UserAuth')
const { hashPassword } = require('../helpers/BcryptHelpers')
const User = require('../model/UserModel');
const router = express.Router();


router.all('/', (req, res, next) => {

    next()
});

router.post('/', (req, res, next) => {

    res.json(req.body)
});

router.post('/signup', async(req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already exist'
            })
            const { name, email, password, company, phone, address } = req.body;
            const hashpass = await hashpassword(password)
            const _user = new User({
                name,
                email,
                password: hashpass,
                company,
                phone,
                address
            });

            _user.save((error, data) => {
                if (error) return res.status(400).json({
                    message: 'Something went wrong'
                })
                if (data) return res.status(200).json({
                    message: 'User created successfully ......!'
                })
            })
        })

});



module.exports = router