const categoryModel = require('../models/Category');

exports.getCategories = async () => {
  const categories = await categoryModel.find().populate('product');
  return categories;
   // return data;
}
exports.getCategoriesInProduct = async (id) => {
  const categories = await categoryModel.find().where(id);
  return categories;
   // return data;
}
exports.getCategoryById = async (id) => {

    const category = await categoryModel.findById(id);
    return category;
}
exports.insertCategory = async (category) => {
  const c = new categoryModel(category);
  await c.save();
}

exports.update = async (id,category) => {
  await categoryModel.findByIdAndUpdate(id,category);
}
exports.delete = async (id) => {
  await categoryModel.findByIdAndDelete(id);
}

exports.getSumCategories = async () => {
  const sumCategories = await categoryModel.find({}).count();
    return sumCategories;
}