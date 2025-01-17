import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";

import { useNavigate } from "react-router-dom";
import { toogleLogin } from "../utils/toogleSlice";

const SigninBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authSlice.userData);

  async function handleAuth() {
    let data = await signInWithPopup(auth, provider);

    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL,
    };

    dispatch(addUserData(userData));
    dispatch(toogleLogin());
    navigate("/")

  }

  async function handleLogOut() {
    await signOut(auth)
    dispatch(removeUserData())
    dispatch(toogleLogin());
  }

  return (
    <>

      {
        userData ? <button onClick={handleLogOut} className="bg-slate-300 p-5 m-6">
          Logout
        </button> : <button onClick={handleAuth} className="mt-8 w-full text-2xl p-2  font-bold bg-[#fc8019] text-white rounded-xl focus:outline-none">Login with Google</button>
      }

    </>
  );
};

export default SigninBtn;
