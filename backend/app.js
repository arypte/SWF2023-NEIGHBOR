const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const raffleRouter = require("./routes/raffle");
const nftRouter = require("./routes/nft");

const app = express();

const port = process.env.PORT || 8080 ;

app.use(cors()) ;
app.use(express.json() ) ;
app.use("/user", userRouter ) ;
app.use("/raffle", raffleRouter ) ;
app.use("/nft" , nftRouter ) ;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server listening on port : ${port} 🦉`);
});