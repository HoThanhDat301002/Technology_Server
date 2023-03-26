const categoryService = require('../services/Category');
exports.getCategories = async () => {
    return await categoryService.getCategories()
}
exports.getCategoriesForWeb = async () => {
    let data = await categoryService.getCategories();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,
            image: item.image,
            description: item.description,
            index : index + 1        
        }
        return item;
    })
    return data;
}
exports.getCategoryById = async (id) => {
    return await categoryService.getCategoryById(id);
}
exports.getCategoryByIdForWeb = async (id) => {
    let category = await categoryService.getCategoryById(id);
    category = {
        _id: category._id,
        name: category.name,
        image: category.image,
        description: category.description,
    }
    return category;
}
exports.checkProductInCategory = async (id) => {
    let category = await categoryService.getCategoryById(id);
    category = {
        product: category.product,
    }
    if(category.product[0] == null){
        return true;
    }else{
        return false;
    }
}

exports.insertCategory = async (body) => {
    await categoryService.insertCategory(body);
}
exports.getCategoryForOneProduct  =  async(selectedId) => {
    
    let categories = await categoryService.getCategories();

    categories = categories.map (item => {
            item = {
                _id : item._id,
                name : item.name,
                description : item.description,
                selectedId : item._id.toString() == selectedId.toString(),
            }
            
            return item;
    })
    return categories;
}


exports.update = async (id,product) => {
    await categoryService.update(id,product);
}
exports.delete = async (id) => {
    await categoryService.delete(id);
}
exports.getSumCategories = async () => {
    const sum =  await categoryService.getSumCategories();
     return sum;
 }