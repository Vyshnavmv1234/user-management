import adminSchema from "../model/adminModel.js"
import userSchema from "../model/userModel.js"
import bcrypt from "bcrypt"

const loadLogin = async (req,res) =>{

  if(req.session.admin){
   return res.redirect("/admin/home") 
  }
  res.render("admin/login")
}

const login = async (req,res) =>{

  try {
    
    const {email,password} = req.body

    const admin = await adminSchema.findOne({email})

    if(!admin) return res.render("admin/login",{error: "Admin not found"})
      const isMatch = await bcrypt.compare(password,admin.password)

    if(!isMatch) return res.render("admin/login",{error: "Incorrect Password"})

      req.session.admin = admin

      return res.redirect("/admin/home")

  } catch (error) {
    console.log(error)
  }
}
const loadHome = async (req,res)=>{
  
  try {

    const admin = req.session.admin

    if(!admin) return res.redirect("/admin/login")

      const users =await userSchema.find()

      res.render("admin/home",{users})
    
  } catch (error) {
    
  }
}
const editUser = async (req,res)=>{

  try {

    const {email,password,id} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userSchema.findOneAndUpdate({_id:id},{$set:{email,password:hashedPassword}})

    res.redirect("/admin/home")
  
    
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req,res)=>{

  try {
    
    const {id} = req.params
  
    const user = await userSchema.findOneAndDelete({_id:id})
    res.redirect("/admin/home")

  } catch (error) {
    console.log(error.message)
  }

}
const addUser = async (req,res) =>{

  try {
    
    const {email,password} = req.body

    const hashedPass = await bcrypt.hash(password,10)

    const newUser = new userSchema({
      email,
      password:hashedPass
    })

    await newUser.save()

    res.redirect("/admin/home")

  } catch (error) {
    console.log(error.message)
  }
}

const logout = (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/admin/home");
    }
    res.redirect("/admin/login");
  });

};

const searchUser = async (req,res) =>{
  
  try {
    
    const query = req.query.q

    if(!query || query.trim() === ""){
      return res.redirect("/admin/login")
    }
    const users = await userSchema.find({
      email:{$regex:query, $options:"i"}
    })
    res.render("admin/home",{users})

  } catch (error) {
    console.log(error.message)
  }
}

export default {
  loadLogin,
  login,
  loadHome,
  editUser,
  deleteUser,
  addUser,
  logout,
  searchUser
}