const voucherService = require('../services/Voucher');
const date = require('../../utils/date');
exports.getVoucher = async () => {
    let data = await voucherService.getVoucher();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            title: item.title,
            image: item.image,
            body: item.body,
            discount: item.discount,
            code: item.code,
            released: date.format(item.released),
            end_date: date.format(item.end_date),
            user_id: item.user_id,
            index : index +1
        }
        return item;
    })
    return data;
}

exports.getVoucherById = async (id) => {
    let voucher = await voucherService.getVoucherById(id);
    voucher = {
        _id: voucher._id,
        title: voucher.title,
        image: voucher.image,
        body: voucher.body,
        discount: voucher.discount,
        code: voucher.code,
        released: date.format(voucher.released),
        end_date: date.format(voucher.end_date),
        user_id: voucher.user_id
    }
    return voucher;
}
exports.insertVoucher = async (body) => {
    await voucherService.insertVoucher(body);
}
exports.update = async (id,news) => {
    await voucherService.update(id,news);
}
exports.delete = async (id) => {
    await voucherService.delete(id);
}