"use strict";

module.exports = function (req, res) {
  res.render('register');

  errors: req.flash('registrationErrors');
};