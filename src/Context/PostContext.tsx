import { createContext, ReactNode, useState } from "react";
import { uniqueId } from "../Utilities/helperFunctions";
import mockPosts from "../Utilities/mockPosts";
import { Comment, Post, PostsContextType } from "../Utilities/types";

// Create a Posts Context to manage posts state
export const PostsContext = createContext<PostsContextType>({
  posts: [],
  addPost: () => [],
  editPost: () => [],
  removePost: () => [],
  addComment: () => [],
  editComment: () => [],
  deleteComment: () => [],
  updatePostsState: () => [],
});

const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts); // Initialize posts state with mock data

  // add a new post to the posts state
  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    return posts;
  };

  // edit a post in the posts state
  const editPost = (postId: string, newText: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, content: newText?.trim() } : post
    );
    setPosts(updatedPosts);
    return updatedPosts;
  };

  // remove a post from the posts state
  const removePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    return posts || [];
  };

  // update the whole context with the updated/new posts
  const updatePostsState = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    return posts;
  };

  // Function to add a comment to a post, potentially nested under another comment
  const addComment = (
    postId: string,
    parentCommentId: string | null,
    text: string
  ): Post[] => {
    // Recursive helper function to add a comment to the correct location
    const addCommentRecursively = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentCommentId) {
          // Add the new comment as a child of the matching comment
          return {
            ...comment,
            children: [
              ...comment.children,
              {
                id: uniqueId(),
                text: text?.trim(),
                children: [],
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        // Recursively check child comments
        return {
          ...comment,
          children: addCommentRecursively(comment.children),
        };
      });
    };

    const updatedPosts = posts.map((post: Post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: parentCommentId
            ? addCommentRecursively(post.comments) // Add as a nested comment
            : [
                ...post.comments,
                {
                  id: uniqueId(),
                  text,
                  children: [],
                  createdAt: new Date().toISOString(),
                }, // Add as a top-level comment
              ],
        };
      }
      return post; // Return unchanged posts
    });

    // Update the context with the updated posts or comments
    updatePostsState(updatedPosts);
    return updatedPosts;
  };

  // Function to edit a comment in a post recursively (including children)
  // based on the comment ID and post ID provided as arguments to the function
  const editComment = (
    postId: string,
    commentId: string,
    newText: string
  ): Post[] => {
    // Recursive helper function to edit a comment in the correct location
    const editCommentRecursively = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, text: newText?.trim() };
        }
        return {
          ...comment,
          children: editCommentRecursively(comment.children),
        };
      });
    };

    // Update the posts state with the edited comment
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: editCommentRecursively(post.comments) }
        : post
    );

    // Update the context with the updated posts or comments
    updatePostsState(updatedPosts);
    return updatedPosts;
  };

  // Function to delete a comment from a post recursively (including children)
  // based on the comment ID and post ID provided as arguments to the function
  const deleteComment = (postId: string, commentId: string): Post[] => {
    const deleteCommentRecursively = (comments: Comment[]): Comment[] => {
      return comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => {
          return {
            ...comment,
            children: deleteCommentRecursively(comment.children),
          };
        });
    };

    // Update the posts state with the deleted comment
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: deleteCommentRecursively(post.comments) }
        : post
    );

    // Update the context with the updated posts or comments
    updatePostsState(updatedPosts);
    return updatedPosts;
  };

  return (
    <PostsContext
      value={{
        posts,
        addPost,
        editPost,
        removePost,
        addComment,
        editComment,
        deleteComment,
        updatePostsState,
      }}
    >
      {children}
    </PostsContext>
  );
};

export default PostsProvider;
