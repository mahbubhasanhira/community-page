import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { customDelay } from "../../Utilities/helperFunctions";
import { NewCommentFormProps } from "../../Utilities/types";

// use the useFormStatus hook to get the status of the form outside of the component
// thats why we are create share button outside of the form component (react 19)
const CreateButton: React.FC = () => {
  const { pending } = useFormStatus(); // true or false
  return (
    <button
      disabled={pending}
      style={{ cursor: pending ? "not-allowed" : "pointer" }}
      type="submit"
    >
      {pending ? "Commenting.." : "Comment"}
    </button>
  );
};

const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  styles,
  addNewComment,
}) => {
  const newCommentFormAction = async (formData: FormData) => {
    const comment = formData.get("comment") as string; // get the content from the form data
    if (!comment.trim()) {
      toast.error("Please enter a valid comment");
      return;
    }
    await customDelay(500); // delay the form submission by 0.5 second for custom loader/UX purpose
    addNewComment(postId, null, comment.trim());
    toast.success("Comment added successfully");
    return;
  };
  return (
    <form action={newCommentFormAction} className={styles.newComment}>
      <input required type="text" name="comment" placeholder="Add a comment" />
      <CreateButton />
    </form>
  );
};

export default NewCommentForm;
