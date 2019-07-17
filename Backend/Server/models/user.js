let mongooes =require('mongoose');
let userSchema = new mongooes.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": [
        {
            "orderId": String,
            "orderTotal": Number,
            "addressInfo": {
                "addressId": String,
                "userName": String,
                "streetName": String,
                "postCode": "String",
                "tel": String,
                "isDefault": Boolean
            },
            "goodsList": [
                {
                    "productImage": String,
                    "salePrice": String,
                    "productName": String,
                    "productId": String,
                    "productNum": Number,
                    "checked": Number
                }
            ],
            "orderStatus": String,
            "createDate": String
        }
    ],
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
    "addressList": [
        {
            addressId: String,
            userName: String,
            streetName: String,
            postCode: String,
            tel: String,
            isDefault: Boolean
        }
    ]
});

module.exports = mongooes.model('user', userSchema);