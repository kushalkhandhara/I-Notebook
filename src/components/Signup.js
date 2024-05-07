import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Signup = (props) =>
{

  const [credentials,setCredentials] = useState({name : "",email : "",password : "",cpassword : ""})
  // const [password,setState] = useState("")
  let history = useHistory();


  

  const handleOnSubmit = async (e) => 
  {
      e.preventDefault();
      const {name,email,password} = credentials;

      const response = await fetch(`http://localhost:5000/api/auth/createuser`,
      {

       method: "POST",
   
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({name,email,password}),
     });
     const json = await response.json();
     console.log(json);
     if (json.success) 
     {
      // Save The auth token and redirect
      localStorage.setItem('token',json.authtoken)
      history.push("/");
      props.showAlert("Succesfully Created Account","success");

     }
     else
     {
      props.showAlert("Invalid Credentials","danger");
     }
  }

  const onChange = (e) =>
  {
      setCredentials({...credentials,[e.target.name] : e.target.value});
  } 
  


  return (
    <div className="container">

      <h2>Create an Account to use iNotebook</h2> 

      <form onSubmit={handleOnSubmit}>

      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input  onChange = {onChange}   type="text" className="form-control my-2" id="name" name = "name" aria-describedby="emailHelp" placeholder="Enter Name"/>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input  onChange = {onChange}  name = "email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted mt-2">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input  onChange = {onChange} name = "password"  type="password" className="form-control mt-2" id="password" placeholder="Password"  minLength = {6}   required/>
        </div>

        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input  onChange = {onChange} name = "cpassword"  type="password" className="form-control mt-2" id="cpassword" placeholder="Password"  minLength = {6} required />
        </div>

        <button type="submit" className="btn btn-primary my-3">Submit</button>
      </form>




    </div>
  )
}

export default Signup