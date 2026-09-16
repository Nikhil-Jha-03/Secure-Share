import  express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import config from "./config/config.js";

const app = express();

app.use(cors({
    // origin:process.env.FRONTEND_URL,
    // methods:["GET","POST","DELETE","PUT"],
    // allowedHeaders:["Content-Type","Authorization"]
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{

    res.json({
        message:"Hey",
        STATUS_CODE:404
    })
})

app.listen(config.PORT,()=>{})