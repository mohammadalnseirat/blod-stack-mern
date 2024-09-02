import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { handleErrors } from "../utils/error.js";
import jwt from "jsonwebtoken";
// 1- Function to Create Sign Up Api Route:
export const signUpPost = async (req, res, next) => {
  // Implement signup logic here
  const { username, email, password } = req.body;
  // check the fields:
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(handleErrors(403, "Please Fill All Required Fields!."));
  }

  // validate passowrd:
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (!passwordRegex.test(password) || passwordRegex.length < 8) {
    return next(
      handleErrors(
        403,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
    );
  }
  // check id user exits:
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(handleErrors(403, "Invalid Email or Password!."));
  }
  // hash password:
  const hashedPassword = bcryptjs.hashSync(password, 15);
  // create a new user:
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully!." });
  } catch (error) {
    console.log("Error in Creating Sign Up Api route", error.message);
    next(error);
  }
};

// 2- Function to create sign in api routes:
export const signInPost = async (req, res, next) => {
  // Implement Sign In Logic Here:
  const { email, password } = req.body;
  if(!email || !password || email === '' || password === ' '){
    return next(handleErrors(403, "Please Fill All Required Fields!."));
  }
  try {
    // Find the User Account:
    const user = await User.findOne({ email });
    if (!user) {
      return next(handleErrors(403, "Invalid Email or Password!."));
    }

    // compare Password:
    const passwordMatched = bcryptjs.compareSync(password, user.password);
    if (!passwordMatched) {
      return next(handleErrors(403, "Invalid Password!."));
    }

    // Generate JWT:
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    // Hide the password:
    const { passowrd, ...rest } = user._doc;

    // save the token:
    res
      .cookie("access_token", token, {
        httpOnly: true, // prevent XSS attacks, cross site scripting attack
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // // prevents CSRF attack, cross-site request forgery attack
        maxAge: 2 * 24 * 60 * 60 * 100, // 2 Days
      })
      .status(201)
      .json(rest);
  } catch (error) {
    console.log("Error in Sign In Api route", error.message);
    next(error);
  }
};
