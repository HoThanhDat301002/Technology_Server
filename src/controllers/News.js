const newsService = require('../services/News');
const date = require('../../utils/date');
exports.getNews = async () => {
    let data = await newsService.getNews();
    data = data.map((item,index) => {
        item = {
            released: date.format(item.released),
            _id: item._id,
            title: item.title,
            image: item.image,
            body: item.body,
            index : index + 1       
        }
        return item;
    })
    return data;
}

exports.getNewsById = async(id) => {
    let news = await newsService.getNewsId(id);
    news = {
        _id: news._id,
        released: date.format(news.released),
        title: news.title,
        body: news.body,
        image: news.image,
    }
    return news;
}
exports.insertNews = async (body) => {
    await newsService.insertNews(body);
}
exports.update = async (id,news) => {
    await newsService.update(id,news);
}
exports.delete = async (id) => {
    await newsService.delete(id);
}
