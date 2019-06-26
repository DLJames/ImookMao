var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');//Goods is an instance of mongooes.model()

//方式一 直接通过connect 回调
mongoose.connect('mongodb://127.0.0.1:27017/dumall', (err)=>{
    if(err) {
        console.error('error is : ', err);
    }else{
        console.log('mongooes connection successful!');
    }
});

//方式二 建立连接，监听connection下的相应事件判断成功 or 失败
// mongoose.connect('mongodb://127.0.0.1:27017/dumall');

// mongoose.connection.on('connected', function() {
//    console.log('mongodb is connect successful'); 
// });

// mongoose.connection.on('disconnected', function() {
//     console.log('mongodb is connect disconnected'); 
// });

// mongoose.connection.on('error', function() {
//     console.log('mongodb is connect fail'); 
// });

router.get('/list', function(req, res, next) {
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = parseInt(req.param('sort'));
    let skip = (page-1)*pageSize;
    let minPrice = parseFloat(req.param('minPrice'));
    let maxPrice = parseFloat(req.param('maxPrice'));
    let params = {};
    let goodsModel = Goods.find(params).where('salePrice').gt(minPrice).lt(maxPrice).skip(skip).limit(pageSize);
    
    goodsModel.sort({'salePrice': sort});//1 升序, -1 降序
    goodsModel.exec(function(err, doc) {
        if(err) {
            res.json({
                status: '1', 
                msg: err.messge
            });
        }else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    });
});

router.post('/addCart', function(req, res, next) {
    let userId = '100000077';
    let User = require('../models/user');//User is an instance of mongooes.model()
    let productId = req.body.productId;
    let productExist = false;

    User.findOne({'userId': userId}, function(userErr, userDoc) {
        if(userErr) {
            res.json({'status': '1', 'msg': userErr.message});
        }else {
            if(userDoc) {
                userDoc.cartList.forEach(function(goodsItem) {
                    if(goodsItem.productId === productId) {
                        productExist = true;
                        goodsItem.productNum++;
                    }
                });
                if(productExist) {
                    userDoc.save(function(saveErr, saveDoc) {
                        if(saveErr) {
                            res.json({'status': '1', 'msg': saveErr.message});
                        }else {
                            res.json({'status': '0', 'msg': 'add cart success!'});
                        }
                    });
                    return;
                }
                Goods.findOne({'productId': productId}, function(goodsErr, goodsDoc) {
                    if(goodsErr) {
                        res.json({'status': '1', 'msg': goodsErr.message});
                    }else {
                        if(goodsDoc) {
                            goodsDoc._doc.productNum = 1;
                            goodsDoc._doc.checked = 1;
                            // goodsDoc.productNum = 1;
                            // goodsDoc.checked = 1;
                            userDoc.cartList.push(goodsDoc);
                            userDoc.save(function(saveErr, saveDoc) {
                                if(saveErr) {
                                    res.json({'status': '1', 'msg': saveErr.message});
                                }else {
                                    res.json({'status': '0', 'msg': 'add cart success!'});
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

module.exports = router;