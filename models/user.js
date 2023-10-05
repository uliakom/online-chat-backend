const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User is required"],
    min: 3,
    max: 20,
    unique: [true, "Email must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
    },
  verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },

    token: String,
    refreshToken: String,
}, {
    versionKey: false,
    timestamps: true,
  });

module.exports = mongoose.model("Users", userSchema);