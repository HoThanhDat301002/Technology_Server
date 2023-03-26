const bannerService = require('../services/Banner');
exports.getBanners = async () => {
    let data = await bannerService.getBanners();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            image: item.image,
        }
        return item;
    })
    return data;
}