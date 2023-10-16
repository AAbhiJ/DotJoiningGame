import { useAppSelector } from "../store";
import { authUserStore } from "../store/slices/AuthUserSlice";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const RootNavigator = () => {
  const { authUser } = useAppSelector(authUserStore);

  if (authUser?.name) {
    return <ProtectedRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default RootNavigator;
