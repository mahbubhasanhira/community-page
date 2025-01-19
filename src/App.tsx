import { ToastContainer } from "react-toastify";
import Feed from "./components/Posts/Feed";
import PostsProvider from "./Context/PostContext";

function App() {
  return (
    <PostsProvider>
      {/* Feed component to display posts, add comment */}
      <Feed />
      {/* toast container for notify or alert */}
      <ToastContainer />
    </PostsProvider>
  );
}

export default App;
