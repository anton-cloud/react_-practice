import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
  const { isAuth, setAuth } = useContext(AuthContext);

  const logOut = () => {
    setAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between" }}
      className="navbar"
    >
      <div className="navbar__links">
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </div>

      {isAuth && <MyButton onClick={logOut}>log out</MyButton>}
    </div>
  );
};

export default Navbar;
