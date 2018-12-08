var bookshelf = require('../config/bookshelf');

var Data_file = bookshelf.Model.extend({
  tableName: 'data_file',
  hasTimestamps: true
});

module.exports = Data_file;