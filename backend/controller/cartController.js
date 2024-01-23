const User = require("../model/user");
const jwt = require("jsonwebtoken");

const updateCart = async (req, res) => {
  try {
    const token = req.cookies.visitorToken;
    // const updatedCart=req.body.updatedCart
    let username;

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        if (error) {
          throw new Error("Invalid Token");
        } else {
          username = payload.username;
        }
    });
    console.log('sjjssj')
    
    console.log(req.body)
    const cart=await User.findOneAndUpdate({username: username},{cart:req.body})

    
      res.json({status:'Item added to Cart'})
    }
  } catch (error) {
    res.json({status:error.message})
  }
};



module.exports = {
  updateCart,
  
};
