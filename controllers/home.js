var formidable = require('formidable');
var fs = require('fs-extra');
var vm = require('vm');
var Data_file = require('../models/Data_file');

/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};