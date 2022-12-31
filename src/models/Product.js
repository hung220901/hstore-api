const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    name:{ type: String, unique: true, required: [true, 'Product must have name'], trim: true},
    color:{ type: String, trim: true},
    size:{ type: String, trim: true},
    price:{ type: String, trim: true ,required: [true, 'Product must have price']},
    image:{ type: String, trim: true ,required: [true, 'Product must have image']},
    thumbnail:{ type: Array},
    desc:{ type: String, trim: true},
    sku:{ type: String, trim: true,unique: true},
    stock:{ type: String, trim: true},
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ],
    collection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Collection'
        }
    ],
    slug: { type: String, slug: "name" , unique: true}
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Product = mongoose.model('Product', productSchema);
module.exports = Product;