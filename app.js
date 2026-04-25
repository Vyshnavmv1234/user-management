import express from "express"
import path from "path"

import userRoute from "./route/user.js"
import adminRoute from "./route/admin.js"
import { fileURLToPath } from 'url';
import connectDB from "./db.js";
import nocache from "nocache"
import session from "express-session";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
connectDB()

app.use(nocache())

app.use(session({
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge:1000*60*60*24
  }
}))

app.set("view engine","hbs")  
app.set("views","views")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static('public'));

app.use("/admin",adminRoute)
app.use("/user",userRoute)

app.listen(3002)      