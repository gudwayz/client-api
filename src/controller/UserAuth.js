const User = require('../model/UserModel');


exports
const signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already exist'
            })
            const { name, email, password, company, phone, address } = req.body;
            const _user = new User({
                name,
                email,
                password,
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

}

const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({
                error
            });
            if (user) {
                if (user.authenticate(req.body.password)) {

                    const token = jwt.sign({ _id: user._id, role: user.role },
                        process.env.SECRET_KEY, { expiresIn: '3h' }
                    );
                    const { _id, firstName, lastName, fullName, role } = user;
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, fullName, role }
                    })
                } else {
                    return res.status(400).json({
                        message: 'invalid password'
                    });
                }

            } else {
                res.status(400).json({
                    message: 'something went wrong'
                })
            }

        })
}