"use strict";

var User = require('../database/models/User');

module.exports = function (req, res) {
  User.create(req.body, function (error, user) {
    if (error) {
      var registrationErrors = Object.keys(error.errors).map(function (key) {
        return error.errors[key].message;
      });
      req.flash('registrationErrors', registrationErrors);
      return res.redirect('/auth/register');
    }

    res.redirect('/');
  });
};