import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "./UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostByID, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });

  const [fetchComments, isCommentsLoading, errorComments] = useFetching(
    async () => {
      const response = await PostService.getCommentsByPostId(params.id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostByID();
    fetchComments();
  }, []);

  return (
    <div>
      <h2>Page with id = {params.id} </h2>
      <div>
        {error && `Error, ${error}!`}
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {post.id}. {post.body}{" "}
          </div>
        )}
      </div>
      <h2 style={{ marginTop: "15px" }}>Comments</h2>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginTop: "15px" }}>
              <h4>{comment.email}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
