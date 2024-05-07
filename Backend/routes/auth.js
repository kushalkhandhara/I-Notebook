const express = require('express');
const User = require('../models/User')
const {body,validationResult} =  require('express-validator')
const router = express.Router();

const bcrypt = require('bcryptjs');//It is Used For Password Encryption

var jwt = require('jsonwebtoken')

var fetchuser = require('../middleware/fetchuser');

// Means JSON Web Token Darek User Ni Alag Thi Id Banavine Aapse
const JWT_SECRET = 'KushalKha$ndhara';
// JWT AUTHENTICATION It provides Secure Communication Between Client And Server



//ROUTE 1 :   Create User Using  : POST "/api/auth/createuser".No login required.
router.post('/createuser',[body('name','Enter a Valid Name').isLength({min : 1}),
                body('email','Enter a Valid email').isEmail(),
                body('password','Password Must be atleast 6 characters').isLength({min :6}),
                
                ],async (req, res) => {
                    let success = false;

// If there are errors, return Bad request and the errors

            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                return res.status(400).json({success,errors: errors.array()});
            }

            // Check Wheather the user with this email exists already
            
            // await  I have written means it is a promise first 
            // the below code is complete then the next code will execute

            
        try {
            let user = await User.findOne({email : req.body.email});
            if (user) 
            {
                return res.status(400).json({success,error : 'User already exists'});
            }
            
            // Create a new user
            
            // await means ruk jao jab tak iski value na mile 
            // tab tak uske baad hi yeh next line mai jayenga

            // Here I have Use Salt because Incase My Web Gets Hacked the 
            // The Hacker would Not get my Password as I have apply Salt and Hash

            const salt = await bcrypt.genSalt(10);
            const secPass =  await bcrypt.hash(req.body.password,salt);

            user = await  User.create({

                name : req.body.name,
                email : req.body.email,
                password : secPass,

            })

            const data = 
            {
                id : user.id
            }
            const authtoken = jwt.sign(data,JWT_SECRET)
            
            console.log(authtoken)
            // res.json(user)
            success = true
            res.json({success,authtoken})
        }
        catch(error) 
        {
            console.log(error.message)
            res.status(500).send("Internals Server Error Occured")
        }
   
})



// ROUTE 2 :  Authenticate A User Using Post "/api/auth/login" . No login required
router.post('/login',[
    body('email','Enter a Valid email').isEmail(),
    body('password','Password Cannot be Blank').exists()],
    async (req, res) => {

        let success = false;


    // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                return res.status(400).json({errors: errors.array()});
            }

    const {email,password} = req.body;
    try {
        let user  = await User.findOne({email: email});
        
        if(!user)
        {
            success = false;
            return res.status(400).json({error : "Please Login With Proper Credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password); // It copmares the user password with database password
        
        if(!passwordCompare)
        {
            success = false;
            return res.status(400).json({success,error : "Please Login With Proper Credentials "});


        }

        const data = 
        {
            id : user.id
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.send({success, authtoken})
    }

    catch(error) 
    {
        console.log(error.message)
        res.status(500).send("Internals Server Error Occured")

    }


                

})


// ROUTE 3 : Get Logged In USer Using User Details : POST : "/api/auth/getuser" Login Required

router.post('/getuser',fetchuser,async (req, res) => 
    {
    

    try 
    {
        console.log(req.user.id)
        const userId =  req.user.id;
        const user = await User.findById(userId).select("-password");
        // This  .select("-password") it will select all the other fields except for password

        res.send(user)
    }

    catch (error) 
    {
        console.log(error.message)
        res.status(500).send("Internals Server Error Occured")
    }
})

module.exports = router;