const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bannerSchema = new Schema({
    id: { type: ObjectId },
    image: {type: String}
});

module.exports = mongoose.model('banner', bannerSchema);