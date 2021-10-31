const Promise = require('bluebird');
const UserRepository = require('../repositories/user_repository');
const AppDao = require('../database/database');
const bcrypt = require('bcrypt');

const dao = new AppDao('C:/Users/dator/WebstormProjects/backend/src/database/user.db')
const userRepo = new UserRepository(dao)

async function getUserById(id) {
    let user = await userRepo.get(id);
    return user;
}

async function addUser(username, email, password) {
    let hash = await bcrypt.hash(password, 11);
    let id = await userRepo.create(username, hash, email);
    let new_user = await userRepo.get(id);
    return new_user;
}


async function deleteUser(id) {
    let user = await userRepo.get(id);
    if (!user) {
        return null
    }
    else {
        await userRepo.delete(user.id);
        return user;
    }

}

async function verifyPassword(id, password) {
    let user = await getUserById(id);
    return bcrypt.compareSync(password, user.password);
}

module.exports = {getUserById, addUser, deleteUser, verifyPassword}
