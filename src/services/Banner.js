const bannerModel = require('../models/Banner');

exports.getBanners = async () => {
  const banner = await bannerModel.find();
  return banner;
   // return data;
}