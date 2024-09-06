import Post from "../models/post.model.js";
import { handleErrors } from "../utils/error.js";
// 1-Function to create a new post
export const create_post = async (req, res, next) => {
  // check if the user is admin or not admin:
  if (!req.user.isAdmin) {
    return next(handleErrors(403, "You are not allowed to create a post!"));
  }
  // check if there is no title or content:
  if (
    !req.body.title ||
    !req.body.content ||
    req.body.title === "" ||
    req.body.content === ""
  ) {
    return next(handleErrors(400, "Please provide all required fields!"));
  }
  if (req.body.title.length < 5) {
    return next(handleErrors(400, "Title must be at least 5 characters long!"));
  }
  // create a slug based on the title:
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  // create a new post:
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("Error in creating new post", error.message);
    next(error);
  }
};
