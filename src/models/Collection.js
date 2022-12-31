const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const collectionSchema = new mongoose.Schema({
    name:{ type: String, unique: true, required: [true, 'Collection must have name'], trim: true},
    slug: { type: String, slug: "name" , unique: true}
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;