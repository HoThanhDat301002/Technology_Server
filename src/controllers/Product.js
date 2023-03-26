const productService = require('../services/Product');
const date = require('../../utils/date');
exports.getProducts = async () => {
    let data = await productService.getProducts();
    data = data.map((item,index) => {
        item = {
            released: date.format(item.released),
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
            category_id: item.category_id,
            category_name: item.category_id.name,
            status: item.status,
            index : index + 1        
        }
        return item;
    })
    return data;
}

exports.getProductSearch = async () => {
    let data = await productService.getProducts();
    
    data = data.map((item,index) => {
        item = {
            released: date.format(item.released),
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
            category_id: item.category_id,
            index : index + 1        
        }
        return item;
    })
    return data;
}

exports.getProductById = async(id) => {
    let product = await productService.getProductById(id);
    product = {
        released: date.format(product.released),
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category_id: product.category_id,
        status: product.status,
    }
    return product;
}

exports.insertProduct = async (body) =>{
    await productService.insert(body);
}
exports.delete = async (id) => {
    await productService.delete(id);
}
exports.update = async (id,product) => {
    await productService.update(id,product);
}
exports.getSumProducts = async () => {
    const sum =  await productService.getSumProducts();
     return sum;
 }