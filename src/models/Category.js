const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const categorySchema = new mongoose.Schema({
    name:{ type: String, unique: true, required: [true, 'Category must have name'], trim: true},
    slug: { type: String, slug: "name" , unique: true}
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Category = mongoose.model('Category', categorySchema);
module.exports = Category;