import { handleErrors } from "../utils/error.js";
import Comment from "../models/comment.model.js";

// 1-Function to create a comment:
export const createcomment_post = async (req, res, next) => {
  // get the data from the body:
  const { content, userId, postId } = req.body;
  // check if the user authenticated:
  if (req.user.id !== userId) {
    return next(handleErrors(403, "You are not allowed to create a comment!"));
  }
  if (!content) {
    return next(handleErrors(400, "Please provide a comment!"));
  }

  // create a comment:
  const newComment = new Comment({
    content,
    userId,
    postId,
  });

  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    console.log("Error creating comment", error.message);
    next(error);
  }
};

// 2-Function to get comments post:
export const getCommentsPost_get = async (req, res, next) => {
  try {
    // find comments:
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1, // to show the new comment in the top-level comments;
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log("Error getting comments", error.message);
    next(error);
  }
};
