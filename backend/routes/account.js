const express = require("express");
const app = express();
const cors = require("cors");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require('mongoose');
app.use(cors());

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {

  try {
    const account = await Account.findOne({
      userId: req.userId
    });
    // const user = await User.findOne({_id: req.userId}).select(['-password'])
  
    res.json({
      balance: account.balance,
      // user: user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch the balance"
    })
  }
});

router.get("/singleuser", authMiddleware, async (req, res)=>{

 try {
   const singleUser = await User.findOne({
     _id: req.userId
   }) .select(['-password'])
    res.json({
     user: singleUser
    });
 } catch (error) {
  res.status(500).json({
    message: "Unable to fetch user details"
  })
 }

})

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  try {
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);
  
    // Commit the transaction
    await session.commitTransaction();
  
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Transfer failed"
    })
  }
});

module.exports = router;
