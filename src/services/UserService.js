const UserDao = require('../dao/userDao')

async function getId(id) {
    console.log("2");
    let user = await UserDao.getId(id);
    return user;
}

module.exports.getId = getId();