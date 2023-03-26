var express = require('express');
var router = express.Router();
const voucherController = require('../../controllers/Voucher');
const authentication = require('../../../middleware/authentication');

//http://localhost:3000/api/voucher
router.get('/voucher', [authentication.checkToken], async function (req, res, next) {
    const voucher = await voucherController.getVoucher();
    res.json(voucher);
});

router.get('/voucher/:id/detail', [authentication.checkToken], async function (req, res, next) {
    const { id } = req.params;
    const voucher = await voucherController.getVoucherById(id);
    res.json(voucher);
});

module.exports = router;