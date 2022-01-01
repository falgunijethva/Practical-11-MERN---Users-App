const express = require('express')
const app = express()
const port = 5000
const mongoose=require("mongoose")
app.use(express.json())

mongoose
.connect("mongodb://127.0.0.1:27017/tblUser")
.then(()=> console.log("mogodb connect"))

const userModel=require("./models/usermodel")

//login
app.post('/app/userlogin',async(req,res)=>{
    const uname= req.body.name;
    const pswd=req.body.password;
    //console.log("user : ",req.body)
    const userlist =  await userModel.find({name:uname,password:pswd})
    if(userlist.length===1){
        console.log("userdata",userlist)
        return res.json({msg:"Login successfully....",code:200,user:userlist[0]})
    }
    else{
        return res.json({msg:"login valide user name and password "})
    }
})

//Registration Page
app.post('/api/registration',async(req,res) => {
    const user= req.body;
    const adduser= await userModel.create(user);
    return res.json({msg:"Registration",data:adduser})
})

//search other user
app.post('/app/searchuser',async(req,res) => {
    const uname=req.body.name
    const userlist= await userModel.find({name:uname})
    if(userlist.length===0){
        return res.json({msg:"no user found"})
    }
    else{
        console.log(userlist)

        return res.json({msg:"search record foundd.....",users:userlist,code:200})
    }
})

//update user 
app.post('/app/updateuser/',async(req,res)=>{
    const uid=req.body.id
    const uname=req.body.name
    const pswd=req.body.password
    const age=req.body.age
    const hobby=req.body.hobby

    const updateuser=await userModel.findOneAndUpdate(
        {id:uid},
        {name:uname,
            password:pswd,
            age:age,
            hobby:hobby
        },
        {new:true}
    );
    return res.json({msg:"user update sucesssfullyy......",user:updateuser,code:200})
})

//user delete
app.post('/app/deleteuser/',async(req,res) => {
    const uid=req.body.id
    const deleteuser=await userModel.findOneAndDelete({id:uid})
    return res.json({msg:"user successfully deleted ....",data:deleteuser,code:200})
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// const express = require('express')
// const app = express()
// const port = 5000
// const mongoose = require("mongoose")


// mongoose
//     .connect("mongodb://localhost:27017/dbuser")
//     .then(()=>console.log("mongo db connected ...."))

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))