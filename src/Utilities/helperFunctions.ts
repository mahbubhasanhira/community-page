import { v4 as uuidv4 } from "uuid";
import { Comment } from "./types";

// function to generate unique short id
export const uniqueId = () => {
  return uuidv4()?.split("-")[0];
};

// function to delay any async operation for custom time duration in milliseconds
export const customDelay = async (ms: number) => {
  // delay the form submission by 1 second
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
};

// function to count the total number of comments including nested comments
export const countComments = (comments: Comment[]): number => {
  try {
    return comments.reduce((total, comment) => {
      // Add 1 for the current comment, then recursively count its children
      return total + 1 + countComments(comment.children);
    }, 0);
  } catch (error) {
    return 0;
  }
};
