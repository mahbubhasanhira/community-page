import { use } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { PostsContext } from "../../Context/PostContext";
import styles from "../../styles/createPost.module.scss";
import { customDelay, uniqueId } from "../../Utilities/helperFunctions";
import { Post } from "../../Utilities/types";
import Avatar from "../Common/Avatar";

// use the useFormStatus hook to get the status of the form outside of the component
// thats why we are create share button outside of the form component (react 19)
type ShareButtonProps = {
  classes: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ classes }) => {
  const { pending } = useFormStatus(); // true or false

  return (
    <button
      disabled={pending}
      className={classes}
      style={{ cursor: pending ? "not-allowed" : "pointer" }}
      type="submit"
    >
      {pending ? "Sharing..." : "Share"}
    </button>
  );
};

const CreatePost: React.FC = () => {
  const { addPost } = use(PostsContext);

  // addPostAction function to add a new post
  const addPostAction = async (formData: FormData) => {
    const content = formData.get("content") as string; // get the content from the form data
    if (!content.trim()) {
      toast.error("Please enter a valid content");
      return;
    }

    await customDelay(500); // delay the form submission by 0.5 second for custom loader/UX purpose
    // create a new post object
    const newPost: Post = {
      id: uniqueId(),
      content: content?.trim(),
      comments: [],
      createdAt: new Date().toISOString(),
    };

    addPost(newPost); // call addPost function from the context
    toast.success("Post shared successfully");
    return;
  };

  return (
    <div className={styles.shareWrapper}>
      <form action={addPostAction}>
        <div className={styles.shareContainer}>
          <div className={styles.shareTop}>
            <span className={styles.shareProfileImg}>
              <Avatar />
            </span>
            <textarea
              className={styles.shareInput}
              placeholder={`What's in your mind?`}
              name="content"
              required
              aria-controls="content"
            />
          </div>

          <hr className={styles.shareHr} />

          <div className={styles.shareBottom}>
            <ShareButton classes={styles.shareButton} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
