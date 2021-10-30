const express = require('express');
const db = require("../../database/database.js")
const UserService = require('../../services/user_service')

const router = express.Router();

// Get ID
router.get("/:id", async (req, res, next) => {
    let user = await UserService.getById(req.params.id);
    res.send(user);
});

module.exports = router;
