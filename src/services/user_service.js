const Promise = require('bluebird')
const UserRepository = require('../repositories/user_repository')
const AppDao = require('../database/database')

const dao = new AppDao('C:/Users/dator/WebstormProjects/backend/src/database/user.db')
const userRepo = new UserRepository(dao)

async function getUserById(id) {
    let user = await userRepo.get(id);
    return user;
}

async function addUser(username, email, password) {
    let userId = await userRepo.create(username, email, password);
    let new_user = await userRepo.get(userId);
    return new_user;
}

module.exports = {getUserById, addUser}