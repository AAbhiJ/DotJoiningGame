import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/publicLayout";
import DragDropBoard from "../pages/DragDropBoard";
// import LoginPage from "../pages/auth/login";
// import DotJoiningGame from "../pages/threejs/wholeCodeDotJoin/DotJoiningGame";
// import DotJoiningGameN from "../pages/threejs/NewDotJoiningGame/DotJoiningGameN";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route path="/" element={<DotJoiningGame />} />
        <Route path="/DotJoinGame" element={<DotJoiningGameN />} /> */}
        <Route path="/board" element={<DragDropBoard />} />
        {/* <Route path="/" element={<Threejs />} /> */}
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
