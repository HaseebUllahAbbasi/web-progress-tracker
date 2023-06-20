import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
const useAuth = () => {
  const user = useSelector((state: StateType) => state?.user);
  if (user?._id)
    return true;
  else return false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};
export default ProtectedRoute;
