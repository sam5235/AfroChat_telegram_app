import { Navigate, Outlet } from "react-router-dom";
import BottomNav from "./components/layouts/BottomNav";

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
}

const ProtectedRoutes = ({ isAuthenticated }: ProtectedRoutesProps) => {
  return (
    <div className="h-screen bg-secondaryBg">
      {isAuthenticated ? (
        <BottomNav>
          <Outlet />
        </BottomNav>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ProtectedRoutes;
