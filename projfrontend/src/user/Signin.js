import React,{useState} from "react"
import Base from "../core/Base"
import {Redirect} from "react-router-dom"
import {signin,authenticate,isAuthenticated} from"../auth/helper"

const Signin =() =>{

  const [values,setValues] =useState({
      email:"ds@gmail.com",
      password:"12345",
      error:"",
      loading: false,
      didRedirect: false

  });
  const {email,password,error,loading,didRedirect}= values;
  const {user} =isAuthenticated();

  const handleChange = name => event =>{

    setValues({...values,error:false, [name]:event.target.value});
 };


 const onsubmit = event =>{
     event.preventDefault();
     setValues({...values,error:false,loading:true})
     signin({email,password})
         .then(data=>{
             if(data.error) {
                 setValues({...values,error:data.error, loading:false})
             }

             else{
                 authenticate(data,()=>{
                     setValues({...values,
                        didRedirect:true});
                 });
             }
         } )
         .catch(console.log("signin request failed!!!"));
 }


 const performRedirect =()=>{
     if(didRedirect){
         if(user && user.role ===1){
              return <p>redirect to admin</p>  
              
         }
         else{
             return <p>redirect to user dashboard</p>
         }
     }
     if(isAuthenticated()){
         return <Redirect to="/"/>;
     }
 }
 const loadingMessage=() =>{
     return(
         loading && (
             <div className="alert alert-info">
             <h2>Loading...</h2>
             </div>
         )
     )

      
};



const errorMessage=() =>{
   return(
       <div className="row"> 
       <div className="col-md-6 offset-sm-3 text-left">
   <div className="alert alert-danger" style={{display: error ? "":"none"}}>
      {error}
   </div>
   </div>
   </div>)
}


    const SignInForm =() =>{
         
        return( 
            <div className="row"> 
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                   
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input onChange={handleChange("email")} value={email} className="form-control" type="email"/>

                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input onChange={handleChange("password")} value={password} className="form-control" type="password"/>

                    </div>
                    <button onClick={onsubmit} className="btn btn-success btn-block">Submit </button>
                </form>

            </div>


            </div>

         )
     }
    return(

        <Base title="Signin  page" description="A page for user signin">
            {loadingMessage()}
            {errorMessage()}
             {SignInForm()}
             {performRedirect}
    <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
export default Signin;