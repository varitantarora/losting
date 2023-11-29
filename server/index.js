const express = require("express");
const dotenv = require("dotenv");
const connectDatabase=require("./database");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
dotenv.config();
connectDatabase();

const user = require("./routes/userRoute.js");
const item = require("./routes/itemRoute.js");


app.use("/api/v1",user);
app.use("/api/v1",item);
app.use(errorMiddleware);


app.get("/", (req,res)=>{
    res.send("api connnected");
} )



app.listen(process.env.PORT, ()=>{
    console.log(`server is connected on port ${process.env.PORT}`);
})