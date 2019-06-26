let mongooes =require('mongoose');
let userSchema = new mongooes.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
            "productId": String,
            "productName": String,
            "salePrice": String,
            "productImage": String,
            "productNum": Number,
            "checked": Number
        }
    ],
    "addressList": Array
});

module.exports = mongooes.model('user', userSchema);