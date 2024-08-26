import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";
import HomePage from "../pages/view/home";
import ExplorePage from "../pages/view/explore";
import HistoryPage from "../pages/view/history";
import Response from "../pages/view/response";
import ChatPage from "../pages/view/chat";
import LoginPage from "../pages/login";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useValidateBotLQuery } from "../services/apiSlice2";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
export const App = () => {
  const webApp = useWebApp();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  // const { data } = useValidateBotLQuery(webApp.initData);
  
  // if (data !== null) {
  //   webApp.close();  TO DO TO DO TO DO
  // }
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/response" element={<Response />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};
