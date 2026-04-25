import userSchema from "../model/userModel.js"
import bcrypt from "bcrypt"
const saltround = 10;

const registerUser = async (req,res) =>{

  try {

      const {email,password} = req.body
      const user = await userSchema.findOne({email})
    
      if(user) return res.render("user/signup",{error: "User already exists"})

        const hashedPass = await bcrypt.hash(password,saltround)
      
      const newUser = new userSchema({
        email,
        password: hashedPass
      })

      await newUser.save()
      res.render("user/login")
    
  } catch (error) {
    console.log(error.message)
  }
}

const login = async (req,res) =>{

  try {

    const {email,password} = req.body
    const user = await userSchema.findOne({email})

    if(!user) return res.render("user/login",{error: "Email does not exist"})

      const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) return res.render("user/login",{error: "Password doesnt match"})

      req.session.user = user

    res.redirect("/user/home")

  } catch (error) {
    console.log(error)
  }
}

const loadSignup = async (req,res)=>{
  res.render("user/signup")
}

const loadLogin = async (req,res)=>{
  res.render("user/login")
}

const loadHome =  (req,res)=>{
  res.render("user/home",{user: req.session.user}) 
}

const logout = (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/user/home");
    }
    res.redirect("/user/login");
  });

};



export default {
  registerUser,
  loadLogin,
  login,
  loadHome,
  loadSignup,
  logout
}