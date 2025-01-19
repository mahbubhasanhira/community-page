import { use, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PostsContext } from "../../Context/PostContext";
import styles from "../../styles/comments.module.scss";
import { CommentsProps, EditCommentState } from "../../Utilities/types";
import Avatar from "../Common/Avatar";
import CommentEditForm from "./CommentEditForm";
import CommentReplyForm from "./CommentReplyForm";
import NewCommentForm from "./NewCommentForm";

const Comments: React.FC<CommentsProps> = ({
  comments,
  postId,
  parentCommentId = null,
}) => {
  const { addComment, editComment, deleteComment } = use(PostsContext); // use the context to get the functions

  const [replyingTo, setReplyingTo] = useState<string | null>(null); // State for hold reply comment ID
  const [editingComment, setEditingComment] = useState<EditCommentState>({
    commentId: "",
    updatedText: "",
  }); // State for hold editing comment ID and text

  // Reference to the comments div element
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={styles.comments}
      // Add left border for nested comments to show hierarchy visually
      style={{
        borderLeft: parentCommentId ? "2px solid #ccc" : "none",
        marginLeft: parentCommentId ? "15px" : "0",
      }}
    >
      {comments.map((comment) => (
        <div key={comment.id + ref} className={styles.comment}>
          <div className={styles.commentContent}>
            <div className={styles.commentText}>
              <h4>
                <Avatar />
                Anonymous
              </h4>

              {editingComment.commentId === comment.id ? (
                <CommentEditForm
                  styles={styles}
                  postId={postId}
                  editComment={editComment}
                  editingComment={editingComment}
                  setEditingComment={setEditingComment}
                />
              ) : (
                <p>{comment.text}</p>
              )}
            </div>
            <div className={styles.commentActions}>
              {!editingComment.commentId && (
                <>
                  <button
                    className={styles.edit}
                    onClick={() => {
                      setEditingComment({
                        commentId: comment.id,
                        updatedText: comment.text,
                      });
                      setReplyingTo(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => {
                      if (postId && comment.id) {
                        deleteComment(postId, comment.id);
                        toast.success("Comment deleted.");
                      }
                    }}
                  >
                    Delete
                  </button>
                  {/* if reply button is clicked then hide reply button and show below the reply form and cancel button */}
                  {!replyingTo && (
                    <button
                      className={styles.reply}
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      Reply
                    </button>
                  )}
                </>
              )}
            </div>
            {/* Show reply form when Reply button is clicked */}
            {replyingTo === comment.id && (
              <CommentReplyForm
                styles={styles}
                parentCommentId={replyingTo}
                postId={postId}
                addReply={addComment}
                cancelReply={() => setReplyingTo(null)}
              />
            )}
          </div>

          {/* Recursively render child comments  */}
          {comment?.children && (
            <Comments
              comments={comment.children}
              postId={postId}
              parentCommentId={comment.id}
            />
          )}
        </div>
      ))}

      {/* form for adding a new comment */}
      {!parentCommentId && (
        <NewCommentForm
          styles={styles}
          postId={postId}
          addNewComment={addComment}
        />
      )}
    </div>
  );
};

export default Comments;
