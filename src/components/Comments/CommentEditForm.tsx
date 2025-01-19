import React from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { customDelay } from "../../Utilities/helperFunctions";
import { CommentEditFormProps } from "../../Utilities/types";

// use the useFormStatus hook to get the status of the form outside of the component
// thats why we are create share button outside of the form component (react 19)
const UpdateButton: React.FC = () => {
  const { pending } = useFormStatus(); // true or false
  return (
    <>
      <button
        disabled={pending}
        style={{ cursor: pending ? "not-allowed" : "pointer" }}
        type="submit"
      >
        {pending ? "Updating.." : "Update"}
      </button>
    </>
  );
};

const CommentEditForm: React.FC<CommentEditFormProps> = ({
  postId,
  styles,
  editComment,
  editingComment,
  setEditingComment,
}) => {
  const cleatEditingState = () => {
    setEditingComment({ commentId: "", updatedText: "" });
  };

  const replyCommentAction = async (formData: FormData) => {
    const comment = formData.get("comment") as string; // get the content from the form data
    if (!comment.trim()) {
      toast.error("Please enter a valid comment");
      return;
    }

    await customDelay(500); // delay the form submission by 0.5 second for custom loader/UX purpose
    editComment(postId, editingComment?.commentId, comment?.trim());
    toast.success("Comment updated successfully");
    // close the reply form after adding the comment
    cleatEditingState();
    return;
  };

  return (
    <form action={replyCommentAction} className={styles.replyComment}>
      <input
        autoFocus
        required
        type="text"
        name="comment"
        placeholder="Update this comment"
        defaultValue={editingComment.updatedText}
      />
      <UpdateButton />
      <button
        onClick={() => cleatEditingState()} // clear the editing state
        className={styles.cancelButton}
        type="button"
      >
        Cancel
      </button>
    </form>
  );
};

export default CommentEditForm;
