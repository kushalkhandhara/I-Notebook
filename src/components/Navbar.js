import React,{useEffect} from 'react'
import { Link ,useLocation} from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Navbar = () => {

    let location = useLocation();
    useEffect(() => {
        // Google Analytics
        console.log(location.pathname)
      }, [location]);
    
     let  history = useHistory();
    const handleLogout = () => 
    {
        localStorage.removeItem('token')
        history.push('/login')
    }
  
  
return (

    
    <>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    {/* Means / Path PAr Home Page Open thai jse */}
                    <Link className={`nav-link ${location.pathname ==="/" ? "active" : "" }`} to = "/">Home</Link>
                </li>
                

            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
                <Link className="btn btn-success mx-2" role = "button" to = "/login">Login</Link>
                <Link className="btn btn-success mx-2" role = "button" to = "/signup">Sign Up</Link>
            </form>:<button onClick = {handleLogout} className  = "btn btn-success">Logout</button>} 
        </div>
    </div>
    </nav>


    </>


   
 
  )
}

export default Navbar
