const Promise = require('bluebird')
const UserRepository = require('../repositories/user_repository')
const AppDao = require('../database/database')

const dao = new AppDao('C:/Users/dator/WebstormProjects/backend/src/database/user.db')
const userRepo = new UserRepository(dao)

async function getById(id) {
    user = await userRepo.getById(id)
    return user;
}

module.exports = {getById}