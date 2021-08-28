//const {getUsers}=require('./helpers/getUsers'),
//{insertUsers}=require("./helpers/insertUser"),
const {getLoginUsers}=require('./helpers/getLoginUsers')


const {updAdmDel, updAdmBlk, updAdmRsm, updWebBlk, updWebRsm} = require('./helpers/updAdm'),
{getUserRoles, getRoles, getUserOnlyRole}=require('./helpers/getUserRoles'),
{getAdmUsers, getAdmOnlyUser, getAdmByUsername, getAdmCount, insAdmUser, updAdmUser}=require('./helpers/getAdmUsers'),
{getAllWebUsers, getWebUsers, getMoreWebUsers, getSearcheWebUsers, getWebOnlyUser, getWebCount}=require('./helpers/getWebUsers')
//{getAllUsers}=require('./helpers/getAllUsers')
//const { searchUser } = require('./helpers/searchUser')


module.exports={
    //getUsers:getUsers,
    getLoginUsers:getLoginUsers,
    getUserRoles:getUserRoles,
    getRoles:getRoles,
    getUserOnlyRole:getUserOnlyRole,
    getAdmUsers:getAdmUsers,
    getAdmOnlyUser:getAdmOnlyUser,
    getAdmByUsername:getAdmByUsername,
    getAdmCount:getAdmCount,
    insAdmUser:insAdmUser,
    updAdmUser:updAdmUser,
    updAdmDel:updAdmDel,
    updAdmBlk:updAdmBlk,
    updAdmRsm:updAdmRsm,
    updAdmBlk:updAdmBlk,
    updWebRsm:updWebRsm,
    updWebBlk:updWebBlk,
    getAllWebUsers:getAllWebUsers,
    getWebUsers:getWebUsers,
    getMoreWebUsers:getMoreWebUsers,
    getSearcheWebUsers:getSearcheWebUsers,
    getWebOnlyUser:getWebOnlyUser,
    getWebCount:getWebCount,
    //insertUsers:insertUsers,
    //getAllUsers:getAllUsers,
    //searchUser:searchUser
}