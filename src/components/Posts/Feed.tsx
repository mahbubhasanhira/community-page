import { use } from "react";
import { PostsContext } from "../../Context/PostContext";
import styles from "../../styles/feed.module.scss";
import { Post } from "../../Utilities/types";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const Feed: React.FC = () => {
  const { posts } = use(PostsContext);
  return (
    <div className={styles.feedWrapper}>
      <h1 className={styles.title}>Community Posts</h1>
      <CreatePost />
      {/* Display all posts */}
      <div>
        {posts.map((post: Post, index: number) => (
          <PostCard index={index} key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
