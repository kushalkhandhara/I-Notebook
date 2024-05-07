import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Login = (props) => 
{
  const [credentials,setCredentials] = useState({email : "",password : ""})
    // const [password,setState] = useState("")
    let history = useHistory();

    const handleOnSubmit = async (e) => 
    {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`,
        {
         method: "POST",
     
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({email : credentials.email,password : credentials.password})
       });
       const json = await response.json();
       console.log(json);
       if (json.success) 
       {
        // Save The auth token and redirect
        localStorage.setItem('token',json.authtoken)
        props.showAlert("Logged in Successfully","success")
        history.push("/");

       }
       else
       {
        // alert("Invalid Credentials")
        props.showAlert("Invalid Credentials","danger");
       }
    }

    const onChange = (e) =>
    {
        setCredentials({...credentials,[e.target.name] : e.target.value});
    } 
    





  return (
    <div className='mt-3'>

      <h2 className='my-3'>Login to continue to iNotebook</h2>

        <form onSubmit = {handleOnSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" value = {credentials.email} name = "email" aria-describedby="emailHelp" placeholder="Enter email"  onChange = {onChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" value = {credentials.password} id="password" placeholder="Password" name="password"  onChange = {onChange}/>
        </div>
        <button type="submit"  className="btn btn-primary my-3" >Submit</button>
        </form>

    </div>

  )

}
export default Login