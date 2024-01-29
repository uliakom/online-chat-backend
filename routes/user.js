const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");


router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);


module.exports = router;