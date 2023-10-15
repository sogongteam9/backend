const categoryProvider = require("../Category/categoryProvider");
const categoryService = require("../Category/categoryService");
const multer = require("multer");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

exports.getCategoryList  = async function (req, res){ 
        const result = await categoryProvider.getCategoryList();
    return res.send(result);
};

exports.getCategory = async function (req, res){ 
    var id = req.params.id; 
    const result = await categoryProvider.getCategory(id);
    return res.send(result);
};

