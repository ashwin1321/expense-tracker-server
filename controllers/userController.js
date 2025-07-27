const userModel = require("../models/userModel");

// Login
const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userModel.findOne({ name, password });

    if (!user) {
      return res.status(404).send("User doesnt't exists");
    }
    else {
      res.status(200).json({
        success: true,
        message: "logged in ",
        user

      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Register
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const { name, email } = req.body;

    const userfind = await userModel.findOne({ name });
    const emailfind = await userModel.findOne({ email });


    if (!userfind && !emailfind) {
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "user register successfully",
        newUser
      })

      return;
    }

    if (userfind === null || emailfind === null) {
      if (userfind !== null) {
        res.status(409).json({
          userExists: "user already exists"
        })
        return;
      }
      if (emailfind !== null) {
        res.status(409).json({
          emailExists: "email already exists"
        })
        return;
      }
    }

    if (userfind.name === name) {
      res.status(409).json({
        userExists: "user already exists"
      })
      return;
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const homeController = (req, res) => {
  res.send("hello");
};

module.exports = { loginController, registerController, homeController };
