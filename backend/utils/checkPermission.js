
const checkPermission = (requestUser, resourceUserId)=>{
    console.log(requestUser, '====req user');
    console.log(resourceUserId, '====req resource user id');
    console.log(typeof resourceUserId, '====type of resource user id');
}
module.exports = checkPermission