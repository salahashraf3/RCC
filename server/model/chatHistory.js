const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const chatSchema = mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    history: [
      {
        userName: {
          type: String,
        },
        userId: {
          type: ObjectId,
          ref: "users",
          required: true,
        },
        chat: {
          type: String,
        },
        time: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to update 'createdAt' for each object in 'history' array
chatSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.history.forEach((message) => {
    if (!message.createdAt) {
      message.createdAt = currentDate;
    }
  });
  next();
});

const chatHistoryModel = mongoose.model("chatHistory", chatSchema);

module.exports = chatHistoryModel;
