const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const brandSchema = new mongoose.Schema({
    name:{ type: String, unique: true, required: [true, 'Brand must have name'], trim: true},
    slug: { type: String, slug: "name" , unique: true}
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;