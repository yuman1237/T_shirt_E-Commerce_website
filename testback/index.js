const express = require("express");
const app = express();

const port =8000;


const admin = (req,res)=>{

       return res.send("ADMIN is HERE....");
};
const isadmin= (req,res,next)=>{
       console.log("isAdmin is running");
       next();
};
const isloggedin= (req,res,next)=>{
       console.log("isloggedin is running");
       next();
};


app.get("/admin",isloggedin,isadmin,admin);


app.get("/",(req,res)=>{

     return res.send("hello there..!");
    });

 app.get("/homepage",(req,res)=>{

        return res.send("home page here");
       });


 app.get("/signin",(req,res)=>{

        return res.send("sign in page");
       });

app.get("/signup",(req,res)=>{

        return res.send("sign in page");
       });
             
      

app.listen(port,()=>{ console.log("server is running");
});
