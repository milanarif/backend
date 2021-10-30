const express = require('express');
const db = require("../../database/database.js")
const UserService = require('../../services/UserService')

const router = express.Router();

// Get Users
router.get("/:id", async (req, res, next) => {
    // CALL SERVICE THAT CALLS DAO AND RESPONDS BACK UP THE CHAIN
    let params = req.params.id;
    // res = UserService.getId(params)
    user = await UserService.getId(params)
    res.send(this.user)
});

// Add User
router.post("/", (req, res, next) => {
    let errors=[]
    if (!req.body.email){
        errors.push("No Email!");
    }
    else if (!req.body.password){
        errors.push("No Password!");
    }
    else if (!req.body.username){
        errors.push("No Username")
    }
    let data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    let sql ='INSERT INTO user (username, password, email) VALUES (?,?,?)'
    let params =[data.username, data.password, data.email]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "user": data,
            "id" : this.lastID
        })
    });
});

// Update User
router.put("/:id", (req, res, next) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    let sql ='UPDATE user SET username = ?, password = ?, email = ?, WHERE userId = ?'
    let params =[data.username, data.password, data.email, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "user": data,
            "id" : this.lastID
        })
    });
})

// Delete User
router.delete("/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE userId = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
        });
})

// Root path
router.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

module.exports = router;
