const {getAllProducts,getProducts,getMoreProducts,getSearchProducts,getProductById,getProductsCount,getApiAllProducts,getApiProducts,getApiProductsByCategory,getApiSrhProducts}=require("./helpers/getAllProducts");
const {insertProduct,updateProduct}=require("./helpers/insertProduct");
const {updPrdDel, updPrdBlk, updPrdRsm} = require('./helpers/updProduct');

module.exports={
    getAllProducts:getAllProducts,
    getProducts:getProducts,
    getMoreProducts:getMoreProducts,
    getSearchProducts:getSearchProducts,
    getProductById:getProductById,
    getProductsCount:getProductsCount,    
    insertProduct:insertProduct,
    updateProduct:updateProduct,
    updPrdDel:updPrdDel,
    updPrdBlk:updPrdBlk,
    updPrdRsm:updPrdRsm,

    getApiAllProducts:getApiAllProducts,
    getApiProducts:getApiProducts,
    getApiProductsByCategory:getApiProductsByCategory,
    getApiSrhProducts:getApiSrhProducts,
}