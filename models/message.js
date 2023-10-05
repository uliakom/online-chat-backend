const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
   chatId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    },
    file: {
        type: Buffer
    },
    status: {
        type: String,
        default: "sent",
        enum: ["sent", "delivered", "seen"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);


// const MessageSchema = mongoose.Schema(
//   {
//     message: {
//       text: { type: String, required: true },
//     },
//     users: Array,
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );