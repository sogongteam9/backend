module.exports = function(app){
    const account = require('./accountController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    //ordertable 추가하기
    app.post('/app/addAccount/:id',jwtMiddleware, account.addAccount);
    //번호표 반환
    app.get('/app/returnNum/:id',jwtMiddleware, account.returnNum);
    //주문 내역 보기
    app.get('/app/accountlist',jwtMiddleware, account.accountlist);
    //mypage(adminpage) - admin 주문 목록 출력
    app.get("/app/adminpage",jwtMiddleware, account.getOrderList);

}