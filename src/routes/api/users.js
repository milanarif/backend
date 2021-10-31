const express = require('express');
const db = require("../../database/database.js")
const UserService = require('../../services/user_service')

const router = express.Router();

// Get ID
router.get("/:id", async (req, res, next) => {
    let user = await UserService.getUserById(req.params.id);
    if (!user) {
        res.status(404).send("Id Not Found")
    }
    else {
        res.send(user);
    }
});

router.post("/", async (req, res, next) => {
    let errors=[];
    if (!req.body.username) {
        errors.push("No Username");
    } if(!req.body.email) {
        errors.push("No Email");
    } if (!req.body.password) {
        errors.push("No Password");
    }
    if (errors.length != 0) {
        res.status(400).json({errors});
    }
    else {
        let newUser = await UserService.addUser(req.body.username, req.body.email, req.body.password);
        res.send(newUser);
    }
});

router.delete("/", async (req, res, next) => {
    let errors=[];
    if (!req.body.id) {
        res.status(400).json("No Id");
    }
    else {
        let deletedUser = await UserService.deleteUser(req.body.id);
        if (deletedUser == null) {
            res.status(404).send("Id not found")
        }
        res.send(deletedUser);
    }
})

router.post("/verify", async (req, res, next) => {
    let errors = [];
    if (!req.body.id) {
        errors.push("No Id");
    }
    if (!req.body.password) {
        errors.push("No Password");
    }
    if (errors.length != 0) {
        res.status(400).json({errors});
    }
    else {
        res.send(await UserService.verifyPassword(req.body.id, req.body.password));
    }
})

module.exports = router;
