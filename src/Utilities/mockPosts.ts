import { uniqueId } from "./helperFunctions";
import { Post } from "./types";

// Mock data for initial posts and comments
const mockPosts: Post[] = [
  {
    id: uniqueId(),
    content: "Welcome to the Community! Feel free to share your thoughts.",
    createdAt: new Date().toISOString(),
    comments: [
      {
        id: uniqueId(),
        text: "This is a great start!",
        createdAt: new Date().toISOString(),
        children: [
          {
            id: uniqueId(),
            text: "I totally agree!",
            createdAt: new Date().toISOString(),
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    content: "Share your thoughts here.",
    createdAt: new Date().toISOString(),
    comments: [
      {
        id: uniqueId(),
        text: "Okay I will!",
        createdAt: new Date().toISOString(),
        children: [],
      },
    ],
  },
  {
    id: uniqueId(),
    content: "What do you think about this platform?",
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: uniqueId(),
    content: "Any suggestions for improvement?",
    createdAt: new Date().toISOString(),
    comments: [],
  },
];

export default mockPosts;
