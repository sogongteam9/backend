module.exports = function(app){
    const cart = require('./cartController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    //cart 추가
    app.get('/app/cart',jwtMiddleware, cart.addCart);
    //cartList 보기
    app.get('/app/cartlist',jwtMiddleware, cart.cartList);
    //cart 삭제하기
    app.get('/app/cartdelete',jwtMiddleware, cart.cartDelete);
    //cart 계산하기
    app.get('/app/calcCart',jwtMiddleware, cart.calcCart);
}