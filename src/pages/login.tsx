import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { setIsAuthenticated } from "../services/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    if (getAccessToken()) {
      dispatch(setIsAuthenticated({ isAuthenticated: true }));
      navigate("/"); // If already authenticated, redirect to the home page
    } 
  }, [getAccessToken, navigate]);

  return (
    <div className="h-screen bg-secondaryBg w-full flex flex-col gap-64">
      <div className="flex flex-col items-center h-1/4 relative top-[20%]">
        <img src="/Afro.svg" alt="" width={200} height={200} />
        <p className="text-4xl font-bold text-center text-text">AfroChat</p>
        <p className="text-center text-text">Generative AI for Africa</p>
      </div>
      <div className="spinner-circle spinner-lg self-center"></div>
    </div>
  );
};

export default LoginPage;
