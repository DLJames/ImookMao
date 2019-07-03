var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登入
router.post('/login', function(req, res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  User.findOne(param, function (err, doc) {
    if(err) {
      res.json({status: '1', msg: err.message});
    }else {
      if(doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000*60*60
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000*60*60
        });
        // req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      }
    }
  });
});

//登出
router.post('/logout', function (req, res, next) {
  // res.cookie('userId', '', {
  //   path: '/',
  //   maxAge: -1
  // });
  res.clearCookie('userId', {path: '/'});

  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

router.get('/checkLogin', function(req, res, next) {
  if(req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: {
        userName: req.cookies.userName
      }
    });
  }else {
    res.json({
      status: '1',
      msg: '当前未登录',
      result: ''
    });
  }
});

router.get('/cartList', function (req, res, next) {
  let params = {
    userId: req.cookies.userId
  };

  User.findOne(params, function (err, doc) {
    if(err) {
      res.json({status: '1', msg: err.message});
    }else {
      if(doc) {
        res.json({
          status: '0',
          msg: '',
          result: {
            cartList: doc.cartList
          }
        });
      }
    }
  });
});

router.post('/cart/del', function(req, res, next) {
  let userId = req.cookies.userId, productId = req.body.productId;

  User.update({'userId': userId}, {
    $pull: {
    'cartList': {
      'productId': productId
    }
  }}, function(err, doc) {
    if(err) {
      res.json({status: '1', msg: err.message});
    }else {
      res.json({status: '0', msg: '', result: 'success'});
    }
  });
});

router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;

  User.update({
    'userId': userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function(err, doc) {
    if(err) {
      res.json({status: '1', msg: err.message});
    }else {
      res.json({status: '0', msg: '', result: 'success'});
    }
  });
});

router.post('/editCheckAll', function(req, res, next) {
  let userId = req.cookies.userId;
  let checkAll = req.body.checkAll;

  User.findOne({'userId': userId}, function(err, userDoc) {
    if(err) {
      res.json({status: '1', msg: err.message});
    }else {
      if(userDoc) {
        userDoc.cartList.forEach(item => {
          item.checked = checkAll
        });
      }
      userDoc.save(function(err, doc) {
        if(err) {
          res.json({status: '1', msg: err.message});
        }else {
          res.json({status: '0', msg: '', result: 'success'});
        }
      });
    }
  });
});

module.exports = router;
