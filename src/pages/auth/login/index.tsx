import * as React from "react";
import AppButton from "../../../components/buttons";
import { useAppDispatch } from "../../../store";
import { setAuthUser } from "../../../store/slices/AuthUserSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const handleAddUser = () => {
    dispatch(setAuthUser({ name: "John Doe", id: 1 }));
  };
  return (
    <div>
      <AppButton variant="text" onClick={() => handleAddUser()}>
        Redux Add User
      </AppButton>
    </div>
  );
};

export default LoginPage;
