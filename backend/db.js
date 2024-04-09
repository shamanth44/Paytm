const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shamanthganiger:clvKtsD6TyNEyggq@cluster0.iq2umsi.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  }, 
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
