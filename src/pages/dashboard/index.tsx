import * as React from "react";
import AppButton from "../../components/buttons";
import { StyledDashboardPageWrapper } from "./styles";

// import reactLogo from "../../assets/react.svg";
// import viteLogo from "../../assets/vite.svg";
// import { useAppDispatch, useAppSelector } from "../../store";
// import {
//   authUserStore,
//   removeAuthUser,
//   setAuthUser,
// } from "../../store/slices/AuthUserSlice";


import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
// import { ApiNetworkService } from "../../network/apiNetworkService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // const dispatch = useAppDispatch();
  // const { authUser } = useAppSelector(authUserStore);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {}, []);

  // const getGithubUsers = () => {
  //   ApiNetworkService.getGithubUsers()
  //     .then((res) => {
  //       console.log(" ApiNetworkService.getGithubUsers", res);
  //     })
  //     .catch((err) => {
  //       console.error(" ApiNetworkService.getGithubUsers", err);
  //     })
  //     .finally(() => {});
  // };

  // const handleAddUser = () => {
  //   dispatch(setAuthUser({ name: "John Doe", id: 1 }));
  // };
  // const handleRemoveUser = () => {
  //   dispatch(removeAuthUser());
  // };

  return (
    <StyledDashboardPageWrapper>
      
      <div className="card">
        <AppButton fontSize={40} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </AppButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <Link to={"/about"}>Go to About Page</Link>
      <FloatButton type="primary" style={{ right: 24 }} />
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{ right: 94 }}
      />
    </StyledDashboardPageWrapper>
  );
};

export default Dashboard;
