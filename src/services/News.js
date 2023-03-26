
const newsModel = require('../models/News');

exports.getNews = async () => {
    const news = await newsModel.find();
    return news;
}

exports.getNewsId = async (id) => {
  const news = await newsModel.findById(id);
  return news;
}

exports.insertNews = async (news) => {
  const n = new newsModel(news);
  await n.save();
}
exports.update = async (id,news) => {
  await newsModel.findByIdAndUpdate(id,news);
}
exports.delete = async (id) => {
  await newsModel.findByIdAndDelete(id);
}
