
import React, { useState, useEffect } from 'react';
import '../src/styles/App.css'
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import { useFetching } from './hooks/useFetching';
import { usePosts } from './hooks/usePosts';
import { getPageCount, getPagesArray } from './utils/pages';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [isOpenModal, setOpenModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  let pagesArray = getPagesArray(totalPages)

  useEffect(() => {
    fetchPosts();
  }, [page])

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setOpenModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: "20px" }} onClick={() => setOpenModal(true)}>create item</MyButton>
      <MyModal visible={isOpenModal} setVisible={setOpenModal}><PostForm create={createPost} /></MyModal>
      <hr style={{ marginTop: "15px", marginBottom: "15px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && `Error, ${postError}!`}
      {isPostsLoading ? <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}><Loader /></div> :
        <PostList posts={sortedAndSearchedPosts} remove={removePost} title="Post list 1" />}

      <div className="page__wrapper">
        {pagesArray.map((p) => <span onClick={() => {
          changePage(p)
        }} key={p} className={page === p ? 'page page__current' : 'page'}>{p}</span>)}
      </div>

    </div>
  );
}

export default App;