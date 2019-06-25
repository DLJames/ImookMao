let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/** 
 * 创建Schema对象时，声明字段类型有两种方法:
 * 一种是首字母大写的字段类型, var mySchema = new Schema({title:String, author:String});
 * 另一种是引号包含的小写字段类型, var mySchema = new Schema({title:'string', author:'string'});
*/
let productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "productUrl": String
});

/** 
 * 方式一：
 * mongoose.model('模型名称（db中collection的名字去掉s）', Schema) 
 * Mongoose会将collection名称设置为模型名称的小写版。
 * 如果名称的最后一个字符是字母，则会变成复数；
 * 如果名称的最后一个字符是数字，则不变；如果模型名称为"MyModel"，则集合名称为"mymodels"；
 * 如果模型名称为"Model1"，则集合名称为"model1"
 */
// module.exports = mongoose.model('good', productSchema);

/**
 * 方式二：
 * 也可以自定义模型名称，那么model() 需要传递第三个参数，也就是collection的名称
*/
module.exports = mongoose.model('Goodlist', productSchema, 'goods');