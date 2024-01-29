const express = require("express");
const router = express.Router();
const { messageController } = require("../controllers");


const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.single("file"), messageController.addMessage);

router.get('/:chatId', messageController.getMessages);

module.exports = router;
