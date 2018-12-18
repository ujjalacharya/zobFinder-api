const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

exports.CategorySchema = CategorySchema;
exports.Category = mongoose.model('category', CategorySchema);