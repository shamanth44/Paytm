const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter ); // /api/v1/user/signup, /api/v1/user/signin, /api/v1/user/, /api/v1/user/bulk
                                 // /api/v1/account/balance, /api/v1/transfer


app.listen(3000, (req, res)=>{
    res.json({
        message: "Server Started"
    })
    console.log("server running on port 3000")
});