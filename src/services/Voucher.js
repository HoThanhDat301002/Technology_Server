const voucherModel = require('../models/Voucher');

exports.getVoucher = async () => {
    const voucher = await voucherModel.find().populate('user_id');
    return voucher;
}

exports.getVoucherById = async (id) => {
    const voucher = await voucherModel.findById(id);
    return voucher;
}
exports.insertVoucher = async (voucher) => {
    const n = new voucherModel(voucher);
    await n.save();
}
  exports.update = async (id,voucher) => {
    await voucherModel.findByIdAndUpdate(id,voucher);
  }
  exports.delete = async (id) => {
    await voucherModel.findByIdAndDelete(id);
  }