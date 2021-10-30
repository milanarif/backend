const UserDao = require('../dao/userDao')

async function getId(id) {
    let user = await UserDao.getId(id);
    console.log(user);
    return user;
}

module.exports = {getId}