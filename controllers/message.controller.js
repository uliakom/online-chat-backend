const MessageModel = require('../models/message.js');
const ChatModel = require('../models/chat.js');

const {
   controllerWrapper,
} = require("../helpers");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  if (req.file) var file = req.file.buffer;

  const message = new MessageModel({
    chatId,
    senderId,
    text,
    file: file,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

 const updateMessageStatus = async ({ chatId, userId, status }) => {
  try {
    if (status === "seen") {
      const lastMessage = await MessageModel.find({
        chatId: chatId,
        senderId: { $ne: userId },
      })
        .limit(1)
        .sort({ $natural: -1 });

        if(lastMessage.length > 0) {
          await MessageModel.updateOne(
            // This can also be updateMany and status: "delivered" can be written in it.
            { _id: lastMessage[0]._id },
            {
              $set: {
                status: status,
              },
            }
          );          
        }

      } else if (status === "delivered") {
        const chats = await ChatModel.find({ members: userId });

        const chatIDs = chats.map((chat) => {
          return chat._id;
        });

        await MessageModel.updateMany(
          {
            chatId: { $in: chatIDs },
            senderId: { $ne: userId },
            status: "sent",
          },
          {
            status: status,
          }
        );
      }
      
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  addMessage: controllerWrapper(addMessage),
  getMessages: controllerWrapper(getMessages),
  updateMessageStatus: controllerWrapper(updateMessageStatus),
};