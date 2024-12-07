const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');




// **********************************************************************
// **********************************************************************
//                          Register User                               *
// **********************************************************************
// **********************************************************************


exports.register = async (req, res) => {
    try {
      const { firstName , lastName ,email , phoneNumber , password } = req.body;
  
      // Check if all fields are filled
      if (!firstName || !lastName || !email || !phoneNumber || !password) {
        return res.status(403).json({
          success: false,
          message: "Please fill all fields"
        });
      }
  
     
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

  
      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        userImage : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}-${lastName}`,
        password: hashedPassword
      });

      const userDetails = await newUser.save();
  
     

      console.log("User registered successfully" , userDetails);

      res.status(201).json({
        success : true,
        message: "User registered successfully"
         });

    } catch (err) {
      console.error("Error registering user:", err); // Detailed error logging
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };
  
  
// **********************************************************************
// **********************************************************************
//                          Login User                                  *
// **********************************************************************
// **********************************************************************


  exports.login = async (req , res) =>{

    try{

        // get data from the body
        const {email , password} = req.body;

        // validation of data

        if(!email || !password)
        {
            return res.status(400).json({
             success : false,
             message : "Please fill all fields "
            })
        }



        // user checks  exists or not 


        const user = await User.findOne({email});

        if(!user)
        {

            return res.status(400).json({
                success : false,
                message : "User is not registered  Please signup first"
               })

        }


        // generate the jwt Token , after password checking 

        if( await bcrypt.compare(password , user.password)){

             const payload = {
                email : user.email,
                id : user._id,
             }

            const token = jwt.sign(payload , process.env.JWTSECRET , {
                expiresIn : "30d",
            })
      
        user.token = token ; 
        user.password = undefined;
        // create cookie

        let options ={
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) , // 30 days
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS in production
          sameSite: 'Lax',
        }

        res.cookie("token" , token , options).status(200).json({
            success : true,
            user ,
            token,
            message : "Logged in Successfully "
        })

        }

        else{
            return res.status(401).json({
                success : false,
                message : "Password is incorrect"
               })
        }
        


    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
                success : false,
                message : "Login failure , Please try again"
               })
    }

}


