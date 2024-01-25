import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./userProfilepage.css";
import { HiOutlineUserCircle } from "react-icons/hi";
import { userContext } from "../../Contexts/userContext";
import { dispatchContext } from "../../Contexts/dispatchContext";
import { useNavigate } from "react-router-dom";

function UserProfilepage() {
  const navigate = useNavigate();
  const {
    userProfile,
    setUserProfile,
    isUserLogged,
    setIsUserLogged,
    logOutFunction,
  } = useContext(userContext);

  const { cartDispatch } = useContext(dispatchContext);

  const userLogOut = () => {
    setIsUserLogged(false);
    setUserProfile({});

    cartDispatch({ type: "clearCart" });

    const logOut = async () => {
      const response = await fetch(
        "https://trend-flare-apparel-store-api.vercel.app/users/logout/visitorToken",
        { credentials: "include" }
      );
    };

    logOut();
  };

  return (
    <div id="userProfilepage">
      <div id="userinfo">
        <div id="userprofileimg">
          <HiOutlineUserCircle size={"100px"} />
        </div>
        <div id="userdetails">
          <p className="accountinfo">
            <span>{userProfile.fullName}</span>
          </p>

          <button id="editprofilebtn">Edit Profile</button>
        </div>
      </div>
      <div id="useroptions">
        <Link to="/orders">My Orders</Link>
        <Link to="/cart">My Cart</Link>
        <Link to="/review">Reviews</Link>
      </div>
      <div id="logoutbtn">
        <button onClick={userLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default UserProfilepage;
