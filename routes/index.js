var express = require('express');

/* GET home page. */
exports.getHomePage = function(req, res, next) {
  res.render('index');
};
