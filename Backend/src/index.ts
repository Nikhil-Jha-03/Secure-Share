import  express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import config from "./config/config.js";
import router from "./api/v1/index.ts";

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
app.use("/api/v1",router);

app.get("/",(req,res)=>{
console.log("hello : ", process.env.DATABASE_URL, "NIKH")
    return res.json({
        message:"Hey no",
        STATUS_CODE:404
    })
})


app.listen(config.PORT,()=>{})