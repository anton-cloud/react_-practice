import React, { useState, useRef } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: Date.now };
    create(newPost);
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      {/* керований компонент */}
      <MyInput
        type="text"
        placeholder="Name"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        placeholder="Description"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <MyButton onClick={addNewPost}>create</MyButton>
    </form>
  );
};

export default PostForm;
