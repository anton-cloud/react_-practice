import React, { useState, useEffect, useRef } from "react";
import "../../src/styles/App.css";
// utils
import { getPagesArray, getPageCount } from "../utils/pages";
// API
import PostService from "../API/PostService";
// custom_hooks
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
// components
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import Loader from "../components/UI/Loader/Loader";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [isOpenModal, setOpenModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  let pagesArray = getPagesArray(totalPages);

  // ===observer підвантаження постів ===

  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isPostsLoading, () =>
    setPage(page + 1)
  );

  // =====================================

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setOpenModal(false);
  };
  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "20px" }}
        onClick={() => setOpenModal(true)}
      >
        create item
      </MyButton>
      <MyModal visible={isOpenModal} setVisible={setOpenModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ marginTop: "15px", marginBottom: "15px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="count"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 10, name: "15" },
          { value: 25, name: "25" },
          { value: -1, name: "all" },
        ]}
      />

      {postError && `Error, ${postError}!`}
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}

      <PostList
        posts={sortedAndSearchedPosts}
        remove={removePost}
        title="Post list 1"
      />

      <div
        ref={lastElement}
        style={{ height: "20px", background: "red", textAlign: "center" }}
      >
        Observer
      </div>

      <div className="page__wrapper">
        {pagesArray.map((p) => (
          <span
            onClick={() => {
              changePage(p);
            }}
            key={p}
            className={page === p ? "page page__current" : "page"}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Posts;
