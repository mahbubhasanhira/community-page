import React from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { customDelay } from "../../Utilities/helperFunctions";
import { CommentReplyFormProps } from "../../Utilities/types";

// use the useFormStatus hook to get the status of the form outside of the component
// thats why we are create share button outside of the form component (react 19)
const ReplyButton: React.FC = () => {
  const { pending } = useFormStatus(); // true or false
  return (
    <>
      <button
        disabled={pending}
        style={{ cursor: pending ? "not-allowed" : "pointer" }}
        type="submit"
      >
        {pending ? "Replying.." : "Reply"}
      </button>
    </>
  );
};

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({
  postId,
  styles,
  addReply,
  cancelReply,
  parentCommentId,
}) => {
  const replyCommentAction = async (formData: FormData) => {
    const comment = formData.get("comment") as string; // get the content from the form data
    if (!comment.trim()) {
      toast.error("Please enter a valid comment");
      return;
    }

    await customDelay(500); // delay the form submission by 0.5 second for custom loader/UX purpose
    addReply(postId, parentCommentId, comment.trim());
    toast.success("You replied to this comment");
    // close/hide the reply form after adding the comment
    cancelReply();
    return;
  };

  return (
    <form action={replyCommentAction} className={styles.replyComment}>
      <input
        autoFocus
        type="text"
        name="comment"
        required
        placeholder="Reply to this comment"
      />
      <ReplyButton />
      <button
        onClick={() => cancelReply()}
        className={styles.cancelButton}
        type="button"
      >
        Cancel
      </button>
    </form>
  );
};

export default CommentReplyForm;
