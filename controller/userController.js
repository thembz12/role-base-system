const jwt = require("jsonwebtoken")
const userModel = require ("../model/userModel.js")
const bcrypt = require ("bcrypt")

exports.signUp = async (req,res)=>{
    try{
        const {fullname, email, password}=req.body
        const userExist = await userModel.findOne({email})
        if(userExist){
            res.status(400).json({message:"user already exist"})
        }else {
            const saltedpassword = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password, saltedpassword)
            const data = {fullname, email, password:hashedpassword}
            const user = await userModel.create(data)
            res.status(201).json({message:"successful", user})

        }
    }catch(error){
        res.status(500).json(error.message)

    }
}

exports.allUsers = async (req,res)=>{
    try {
        const users = await userModel.find()
        if(users.length <=0){
            return res.status(400).json({
                message:"no available registered users"
            })
        }else{
            res.status(200).json({
                message:"all resgistered users",
                totalUsersRegistered: users.length,
                data: users
            })
        }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}



exports.loginUser = async (req,res)=>{
    try{
        const {email, password}=req.body
        const userExist = await userModel.findOne({email:email.toLowerCase()})
        if(!userExist){
            return res.status(400).json({message:"user not found"})
        }

        const confirmPassowrd = await bcrypt.compare(password, userExist.password)
        if(!confirmPassowrd){
            return res.status(400).json({message:"incorrect password"})
        }
        const token = await jwt.sign({
            userId: userExist._id,
            email: userExist.email
        }, process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({message:"login successful",data:userExist, token})
        

    }catch(error){ 
        res.status(500).json(error.message)
    }
}

exports.studentScore = async (req,res)=>{
    try {
        const {html,  CSS, javascript, remark}=req.body
        const studentID = req.params.id
        const student = await userModel.findById(studentID)
        if(!student){
          return  res.status(400).json({message:" student not found"})
        }
        
        student.score.html = html || student.score.html
        student.score.CSS = CSS || student.score.CSS
        student.score.javascript = javascript|| student.score.javascript
        student.score.remark = remark || student.score.remark

        await student.save()

        res.status(200).json({message:"student score updated successfully", data:student})


    } catch (error) {
        res.status(500).json(error.message)
        
    }
}

exports.makeAdmin = async (req,res)=>{
    try {
        const userId = req.params.id
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        user.isAdmin = true
        await user.save()
        res.status(200).json({message:"user now an admin", data:user})
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}
exports.SignOutUser = async (req,res)=>{
    try {
      const token =  req.headers.authorizaton
      const userWithToken = await userModel.find({token})
      if(!userWithToken){
          res.status(400).json({
              message:"this user is not signed in"
          })
      }else{
          userWithToken.token = " "
          res.status(200).json({
              message:"user signout successfully"
          })
      }
      
    } catch (error) {
      res.status(500).json(error.message)
      
    }
  }
  