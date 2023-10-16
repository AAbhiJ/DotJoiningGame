import { Outlet } from "react-router-dom";
import { LayoutContentWrap, LayoutTopMenuWrap, LayoutWrap } from "../layoutStyles";
import TopMenu from "../topmenu";

const ProtectedLayout = () => {
  return (
    <LayoutWrap>
      <LayoutTopMenuWrap> <TopMenu/></LayoutTopMenuWrap>
      <LayoutContentWrap>
        <Outlet />
      </LayoutContentWrap>
    </LayoutWrap>
  );
};

export default ProtectedLayout;