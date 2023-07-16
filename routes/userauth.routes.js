const { Router } = require("express");
const { userModel } = require("../models/userauth.model");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age, city } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_password) => {
      if (err) {
        res.status(400).json("invalid hashing");
      } else {
        console.log(secure_password);
        const userData = await userModel.create({
          email,
          pass: secure_password,
          name,
          age,
          city,
        });
        console.log(userData);
        return res.status(200)
          .json(`The new user has been registered,registeredUser:${userData}
    }`);
      }
    });
  } catch (err) {
    console.log(err.message);
    res.send(`400:{
        error:${err.message}
    }`);
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const loggedUser = await userModel.find({ email });
    console.log(bcrypt.compare(pass, loggedUser[0].pass));
    const user_Id = loggedUser[0]._id;
    if (loggedUser.length > 0) {
      bcrypt.compare(pass, loggedUser[0].pass, function (err, result) {
        if (result) {
          const token = jwt.sign({ user_Id }, "masaikey");
          //  res.send(`200:{msg:"Login successful!",token:${token}}`)
          return res
            .status(200)
            .json({ msg: "Login successful!", token: token });
        } else {
          res.send("Invalid credentials");
        }
      });
      console.log(loggedUser, "is logged user");
    } else {
      res.send("Invalid login details");
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
module.exports = { userRouter };
