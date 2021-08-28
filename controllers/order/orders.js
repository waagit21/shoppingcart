const {getAllOrders,getOrders,getMoreOrders,getSearchOrders,getOrderById,getOrdersCount,getOrderNumber}=require("./helpers/getAllOrders");
const {insertOrder,updateOrder,insertApiOrder}=require("./helpers/insertOrder");
const {updOrdDel, updOrdBlk, updOrdRsm} = require('./helpers/updOrder');

module.exports={
    getAllOrders:getAllOrders,
    getOrders:getOrders,
    getMoreOrders:getMoreOrders,
    getSearchOrders:getSearchOrders,
    getOrderById:getOrderById,
    getOrdersCount:getOrdersCount,
    getOrderNumber,getOrderNumber, 
    insertOrder:insertOrder,
    updateOrder:updateOrder,
    updOrdDel:updOrdDel,
    updOrdBlk:updOrdBlk,
    updOrdRsm:updOrdRsm,

    insertApiOrder: insertApiOrder,
}