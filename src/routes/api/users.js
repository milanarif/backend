const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require("../../database/database.js");
const UserService = require('../../services/user_service');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/get/:id", async (req, res, next) => {
    let user = await UserService.getUserById(req.params.id);
    if (!user) {
        res.status(404).send("Id Not Found")
    }
    else {
        res.send(user);
    }
});

router.get("/search", async (req, res, next) => {
    let user = await UserService.getUserByEmail(req.body.email);
    if (!user) {
        res.status(404).send("Email Not Found")
    }
    else {
        res.send(user);
    }
});

router.post("/add", async (req, res, next) => {
    let errors=[];
    if (!req.body.name) {
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
        let newUser = await UserService.addUser(req.body.name, req.body.email, req.body.password);
        if (newUser != null) {
            res.send(newUser);
        }
        else {
            res.status(403).send("Email already registered")
        }
        
    }
});

router.delete("/", authenticateToken, async (req, res, next) => {
    let errors=[];
    if (!req.body.id) {
        res.status(400).json("No Id");
    }
    if (req.body.id != req.user.id) {
        res.status(403).send("Cannot delete other account");
    }
    else {
        let deletedUser = await UserService.deleteUser(req.body.id);
        if (deletedUser == null) {
            res.status(404).send("Id not found")
        }
        res.send(deletedUser);
    }
})


router.post("/login", async (req, res, next) => {
    let errors = [];
    if (!req.body.email) {
        errors.push("No email");
    }
    if (!req.body.password) {
        errors.push("No Password");
    }
    if (errors.length != 0) {
        res.status(400).json({errors});
    }
    else {
        accessToken = await UserService.login(req.body.email, req.body.password);
        if (!accessToken) {
            res.status(403).send("Wrong email or password")
        }
        res.send({accessToken: accessToken});
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403);
        }
        else {
            req.user = user;
            next();
        }
    })
}

module.exports = router;
