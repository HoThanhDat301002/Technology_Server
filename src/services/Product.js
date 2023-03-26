// tầng giao tiếp với database
const Category = require('../models/Category');
const productModel = require('../models/Product');

//lấy danh sách sản phẩm
exports.getProducts = async () => {
    const products = await productModel.find({}).populate('category_id');
    return products;
}

//lấy thông tin chi tiết 1 sản phẩm
exports.getProductById = async (id) => {
  const product = await productModel.findById(id).populate('category_id');
  return product;
}

exports.insert = async (product) => {
  const p = new productModel(product);
  await p.save();
  if(product.category_id){
    const categories = Category.findById(product.category_id);
    await categories.updateOne({$push: {product: p._id}});
  }
}
exports.delete = async (id) => {
  await productModel.findByIdAndDelete(id);
  
}
exports.update = async (id,product) => {
  await productModel.findByIdAndUpdate(id,product);
}
exports.getSumProducts = async () => {
  const sumProducts = await productModel.find({}).count();
    return sumProducts;
}
