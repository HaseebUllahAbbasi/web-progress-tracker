import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";

const useAuth = () => {
  const user = useSelector((state: StateType) => state?.user);
  console.log(user)

  if (user?.username) return true;
  else return false;
};

const ProtectedRoutes: React.FunctionComponent = () => {
  const isAuth = useAuth();
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
}
export default ProtectedRoutes;