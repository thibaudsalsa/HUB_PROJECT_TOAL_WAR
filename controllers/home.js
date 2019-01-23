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

/*Stockage du fichier dans le serveur
exports.homePost = function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./upload/"; //+ req.user.attributes.email;
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (form.openedFiles[0].size == 0) {
      fs.unlink(form.openedFiles[0].path);
      res.redirect('/');
    } else {
      if (err) {
        console.log(err);
        req.flash("error", {msg: "An error occured. Please try again." });
      }
      new Data_file({
        link: files.upload.path,
        title: files.upload.name,
        id_user: req.user.id,
        description: fields.commentaire,
        name: fields.titre,
        public_access: fields.acces_public === 'on' ? 1 : 0
      }).save();
      res.redirect('/');
    }
  });
};*/

/*Modification du fichier dans la BDD
exports.homePut = function(req, res) {
  var d = {
    name: req.body.titre,
    description: req.body.commentaire,
    public_access: req.body.acces === 'true' ? 1 : 0
  };
  new Data_file({'id': req.body.id})
    .save(d, {patch: true})
    .then (function() {
      res.send("ok");
    });
};*/

/*Ouverture du fichier avec Upbrowser
exports.upbrowserGet = function(req, res) {
  for (var i = 0; i < res.locals.data_file.length && req.query.id != res.locals.data_file[i].id; i++);
  res.write(fs.readFileSync(res.locals.data_file[i].link, 'utf-8'));
  
  res.write("<script src='/js/Upbrowser/upbrowser.js'></script>");
  res.end();
};*/

/*
exports.homeDelete = function(req, res) {
  new Data_file()
    .query('where', 'id', '=', req.body.id)
    .fetch()
    .then(function(data_file) {
      fs.unlink(data_file.toJSON().link);
      data_file.destroy();
      res.send("ok");
    });
};*/