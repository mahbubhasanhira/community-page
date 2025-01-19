// type for the context and components
type PostsContextType = {
  posts: Post[];
  addPost: (newPost: Post) => Post[]; // Function to add a new post
  editPost: (postId: string, newText: string) => Post[]; // Function to edit a post
  removePost: (postId: string) => Post[]; // Function to remove a post
  updatePostsState?: (updatedPosts: Post[]) => Post[]; // Function to update the posts state
  addComment: (
    postId: string,
    parentCommentId: string | null,
    text: string
  ) => Post[]; // Function to add a new comment
  editComment: (postId: string, commentId: string, newText: string) => Post[]; // Function to edit a comment
  deleteComment: (postId: string, commentId: string) => Post[]; // Function to delete a comment
};

type Post = {
  id: string; // Unique id for the post
  content: string;
  createdAt: string;
  comments: Comment[]; // Array of comments on the post
};

type PostCardProps = {
  index: number;
  post: Post;
};

type Comment = {
  id: string; // Unique id for the comment
  text: string;
  createdAt: string;
  children: Comment[]; // Array of nested child comments
};

// Props for the Comments component
type CommentsProps = {
  comments: Comment[];
  postId: string; // ID of the post these comments belong to
  parentCommentId?: string | null; // ID of the parent comment (for nested comments)
};

type CommentReplyFormProps = {
  styles: any; // Styles object for the component
  postId: string; // ID of the post
  parentCommentId: string | null;
  cancelReply: () => void; // Function to cancel the reply
  addReply: (
    postId: string,
    parentCommentId: string | null,
    text: string
  ) => void; // Function to add a reply
};

type NewCommentFormProps = {
  styles: any; // Styles object for the component
  postId: string;
  addNewComment: (
    postId: string,
    parentCommentId: string | null,
    text: string
  ) => void; // Function to add a new comment to the post
};

type EditCommentState = {
  commentId: string; // ID of the comment being edited
  updatedText: string; // Updated text for the comment
};

type CommentEditFormProps = {
  postId: string;
  styles: any;
  editComment: (postId: string, commentId: string, newText: string) => void; // Function to edit a comment
  editingComment: EditCommentState;
  setEditingComment: (comment: EditCommentState) => void; // Function to set the comment being edited
};

type AccordionProps = {
  postIndex: number;
  commentCount: number;
  children: React.ReactNode;
};

// Export the types for use in other components
export type {
  AccordionProps,
  Comment,
  CommentEditFormProps,
  CommentReplyFormProps,
  CommentsProps,
  EditCommentState,
  NewCommentFormProps,
  Post,
  PostCardProps,
  PostsContextType,
};
