const Product = require("../model/product");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    const Users = await User.find({});
    res.json({
      data: Users,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const userLogIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.JWT_KEY
        );
        const expirationDate = new Date(Date.now() + 86400000);
        const cookieName = user.role === "user" ? "visitorToken" : "adminToken";
        res.cookie(cookieName, token, {
          httpOnly: true,
          expires: expirationDate,
          sameSite: "None",
          secure: true,
          //has to enable these attributes at the time of publishing.
        });

        if (user.role === "admin") {
          res.json({ status: "success", role: "admin", username: username });
        } else {

          const ids = user.cart.map((element) => {
            return element.product_id;
          });

          

          
          let fetchedDocuments=[] ;

          for (const id of ids) {
            // Fetch the document corresponding to the current ID
            const document = await Product.findById(id);
          
            // If a document is found, push it to the fetchedDocuments array
            if (document) {
              fetchedDocuments.push(document);
            }else{
              fetchedDocuments.push(null);
            }
          }

          const cart = fetchedDocuments.map((element, index) => {
          
            if(element!=null){
            return {
              CartImg: element.thumbnail,
              CartName: element.title,
              CartPrice: element.price,
              productcode: element._id,
              size: user.cart[index].size,
              id: element._id,
              quantity: user.cart[index].quantity,
            };
          }
          });

          

          res.json({
            status: "success",
            role: "visitor",
            userDetails: user,
            cart: cart,
          });
        }
      } else {
        throw new Error(`Password Doesn't Matched`);
      }
    } else {
      throw new Error("user Doesn't Exist");
    }
  } catch (error) {
    res.json({ status: error.message });
    console.log(error.message);
  }
};

const adminLogIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.JWT_KEY
        );
        const expirationDate = new Date(Date.now() + 86400000);
        res.cookie("adminToken", token, {
          httpOnly: true,
          expires: expirationDate,
        });
        res.json({ status: "success", username: username });
      } else {
        throw new Error(`Password Doesn't Matched`);
      }
    } else {
      throw new Error("user Doesn't Exist");
    }
  } catch (error) {
    res.json({ status: error.message });
  }
};

const logOut = async (req, res) => {
  const cookie = req.params.cookie;
  res.clearCookie(cookie, { httpOnly: true });

  res.json({
    statu: "success",
  });
};

const userAuthCheck = async (req, res) => {
  try {
    console.log(req.cookies.visitorToken);
    if (req.cookies.visitorToken) {
      const token = req.cookies.visitorToken;
      // const decoded = jwt.verify(token, process.env.JWT_KEY);
      let username;
      jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        if (error) {
          //     res.json({ permission: false, status: "token failure" });
          throw new Error("Invalid Token");
        } else {
          username = payload.username;
        }
      });

      const user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("error");
      } else {

        const ids = user.cart.map((element) => {
            return element.product_id;
          });

          

          
          let fetchedDocuments=[] ;

          for (const id of ids) {
            // Fetch the document corresponding to the current ID
            const document = await Product.findById(id);
          
            // If a document is found, push it to the fetchedDocuments array
            if (document) {
              fetchedDocuments.push(document);
            }else{
              fetchedDocuments.push(null);
            }
          }

          const cart = fetchedDocuments.map((element, index) => {
          
            if(element!=null){
            return {
              CartImg: element.thumbnail,
              CartName: element.title,
              CartPrice: element.price,
              productcode: element._id,
              size: user.cart[index].size,
              id: element._id,
              quantity: user.cart[index].quantity,
            };
          }
          });


        res.status(200).json({ user: user, cart: cart });
        console.log("authorized user");
      }
    } else {
      throw new Error("User not Authorized");

      // res.status(401);
    }
  } catch (error) {
    res.status(401).json({ err: error });
    // console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    let isUser = await User.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    console.log("jslkajl", isUser);

    if (isUser.length > 0) {
      throw new Error("Username or Email already exist");
    } else {
      const newUser = await new User(req.body).save();
      // user = await newUser.save();

      res.status(200).json({
        data: newUser,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    res.json({ err: error });
  }
};

const adminAuthCheck = async (req, res) => {
  try {
    console.log("checkingAdmin");
    const token = req.cookies.adminToken;
    console.log("token is: ", token);

    const checkUser = async (username) => {
      const user = await User.findOne({ username: username });
      if (user && user.role === "admin") {
        res.json({ permission: true, status: "success" });
      } else {
        res.json({ permission: false, status: "User is not an admin" });
      }
    };

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        if (error) {
          res.json({ permission: false, status: "token failure" });
        } else {
          checkUser(payload.username);
        }
      });
    } else {
      res.json({ permission: false, status: "No token found" });
    }
  } catch (error) {
    res.json({ permission: false, status: "Unknow Error" });
  }
};

module.exports = {
  userLogIn,
  createUser,
  getAllUser,

  deleteUser,
  userAuthCheck,
  adminLogIn,
  adminAuthCheck,
  logOut,
};
