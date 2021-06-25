// const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({email,password}, (error, user) => {
        if (user) {
                if (password === user.password) {
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    console.log('big problem')
                }
        } 
        else {
            return res.redirect('/auth/login')
        }
    })
}