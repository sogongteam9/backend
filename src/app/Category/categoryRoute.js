module.exports = function(app){
    const category = require('./categoryController');
    //category 전체 조회
    app.get('/app/getcategoryList',category.getCategoryList);
    //특정 category 조회
    app.get('/app/getcategory/:id', category.getCategory);
    
}