import React, { use, useTransition } from "react";
import { toast } from "react-toastify";
import { PostsContext } from "../../Context/PostContext";
import styles from "../../styles/postCard.module.scss";
import { countComments, customDelay } from "../../Utilities/helperFunctions";
import { PostCardProps } from "../../Utilities/types";
import Comments from "../Comments/Comments";
import Avatar from "../Common/Avatar";
import Accordion from "./Accordion";

const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  const { editPost, removePost } = use(PostsContext); // use the context to get the removePost function

  const [isDeleting, startDeleteTransition] = useTransition(); // react 19 useTransition hook for custom loader

  // Function to pre process the post edit and call the context function
  const handleEditPost = async (postId: string) => {
    const updatedContent = window.prompt("Edit post", post.content); // prompt to edit the post

    if (updatedContent?.trim()) {
      // check if the content is updated or not
      if (updatedContent.trim() === post.content.trim()) {
        toast.warn("No changes made");
        return;
      }
      editPost(postId, updatedContent?.trim()); // call editPost function from the context
      toast.success("Post successfully updated");
      return;
    }
    toast.error("Please enter a valid content");
    return;
  };

  // Function to pre process the post deletion and call the context function
  const handleRemovePost = async (postId: string) => {
    if (postId) {
      startDeleteTransition(async () => {
        await customDelay(500); // delay the form submission by 0.5 second for custom loader/UX purpose

        // call removePost function from the context
        removePost(postId);
        toast.success("Post successfully removed");
      });
    }
  };

  return (
    <div key={post.id} className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Avatar />
            <span className={styles.profileName}>Anonymous</span>
          </div>
          <div className={styles.postTopRight}>
            {/* post edit button */}
            <button className={styles.edit} onClick={() => handleEditPost(post.id)}>Edit</button>
            {/* post delete button */}
            <button
              disabled={isDeleting}
              style={{ cursor: isDeleting ? "not-allowed" : "pointer" }}
              onClick={() => handleRemovePost(post.id)}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
        <div className={styles.postCenter}>
          <p>{post.content}</p>
        </div>
        <hr />

        {/* use accordion to display comment */}
        <Accordion
          postIndex={index}
          commentCount={countComments(post?.comments)}
        >
          <Comments comments={post.comments} postId={post.id} />
        </Accordion>
      </div>
    </div>
  );
};

export default PostCard;
