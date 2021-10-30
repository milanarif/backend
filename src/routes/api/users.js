const express = require('express');
const db = require("../../database/database.js")
const UserService = require('../../services/user_service')

const router = express.Router();

// Get ID
router.get("/:id", async (req, res, next) => {
    let user = await UserService.getUserById(req.params.id);
    res.send(user);
});

router.post("/", async (req, res, next) => {
    let errors=[]
    if (!req.body.username) {
        errors.push("No Username")
    } if(!req.body.email) {
        errors.push("No Email")
    } if (!req.body.password) {
        errors.push("No Password")
    }
    if (errors.length != 0) {
        res.status(400).json({errors})
    }
    else {
        let response = await UserService.addUser(req.body.username, req.body.email, req.body.password)
        res.send(response)
    }
});

module.exports = router;
