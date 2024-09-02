import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { handleErrors } from "../utils/error.js";

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
