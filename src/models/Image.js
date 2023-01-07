const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name:{ type: String, required: [true, 'Image must have name']},
    image:{data:Buffer, contentType:String}
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Image = mongoose.model('Image', imageSchema);
module.exports = Image;