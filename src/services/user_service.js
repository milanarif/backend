require('dotenv').config();
const Promise = require('bluebird');
const UserRepository = require('../repositories/user_repository');
const AppDao = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dao = new AppDao('C:/Users/dator/WebstormProjects/backend/src/database/user.db')
const userRepo = new UserRepository(dao)

async function getUserById(id) {
    let user = await userRepo.get(id);
    return user;
}

async function getUserByEmail(email) {
    let user = await userRepo.search(email);
    return user;
}


//TODO: CHECK FOR DUPLICATE EMAILS! SHOULD ONLY BE ONE ACCOUNT PER EMAIL!
async function addUser(name, email, password) {
    let existing = await getUserByEmail(email);
   
    if (!existing) {
        let hash = await bcrypt.hash(password, 11);
        let id = await userRepo.create(name, hash, email);
        let new_user = await userRepo.get(id);
        return new_user;
    }
    else return null;
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

async function checkPassword(email, password) {
    let hash = await userRepo.getPasswordHashByEmail(email);
    if (!hash) {
        return false;
    }
    else {
        return (bcrypt.compareSync(password, hash));
    }
}

async function login(email, password) {
    if (await checkPassword(email, password)) {
        user = await getUserByEmail(email);
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
    }
    else {
        return null;
    }
}


module.exports = {getUserById, getUserByEmail, addUser, deleteUser, login}
