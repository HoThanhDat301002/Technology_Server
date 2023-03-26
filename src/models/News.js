const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const newsSchema = new Schema({
    id: { type: ObjectId },
    title: { type: String },
    body: { type: String },
    image: { type: String },
    released: { type: Date },
});

module.exports = mongoose.model('news', newsSchema);