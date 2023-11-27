const categoryProvider = require("../Category/categoryProvider");
const multer = require("multer");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

//카테고리 리스트
exports.getCategoryList  = async function (req, res){ 
    const result = await categoryProvider.getCategoryList();
    return res.send(result);
};

//카테고리 가져오기
exports.getCategory = async function (req, res){ 
    var id = req.params.id; 
    const result = await categoryProvider.getCategory(id);
    return res.send(result);
};

