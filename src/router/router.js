import PostIdPage from "../components/PostIdPage";
import About from "../pages/About";
import Login from "../pages/Login";
import Posts from "../pages/Posts";

export const privateRoutes = [
    { path: "/about", component: About, exact: true },
    { path: "/posts", component: Posts, exact: true },
    { path: "/posts/:id", component: PostIdPage, exact: true }
]

export const publicRoutes = [
    { path: "/login", component: Login, exact: true },
]
