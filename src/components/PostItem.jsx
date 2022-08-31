import MyButton from "./UI/button/MyButton";
import { useHistory } from "react-router-dom";

const PostItem = ({ number, post, remove }) => {
  const router = useHistory();
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router.push(`/posts/${post.id}`)}>
          Open
        </MyButton>
        <MyButton onClick={() => remove(post)}>Delete</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
