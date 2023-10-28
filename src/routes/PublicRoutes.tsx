import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/publicLayout";
import DragDropBoard from "../pages/DragDropBoard";
// import LoginPage from "../pages/auth/login";
// import DotJoiningGame from "../pages/threejs/wholeCodeDotJoin/DotJoiningGame";
import DotJoiningGameN from "../pages/threejs/NewDotJoiningGame/DotJoiningGameN";
import Threejs from "../pages/threejs";
// import PracticalCanvas from "../components/PracticalCanvas/utils/PracticalCanvas";
// import FlipFlop from "../components/PracticalCanvas/FlipFlop";
import Practical from "../pages/practical";
import FlipFlop from "../pages/practical/FlipFlop";
import Counter from "../pages/counterRedux";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        {/* <Route path="/" element={<PracticalCanvas />} /> */}
        <Route path="/prac" element={<Practical />} />
        <Route path="/flipflopn" element={<FlipFlop />} />
        <Route path="/reduxTest" element={<Counter />} />
        {/* <Route path="/flipflop" element={<FlipFlop />} /> */}
        {/* <Route path="/" element={<DotJoiningGame />} />*/}
        <Route path="/DotJoinGame" element={<DotJoiningGameN />} /> 
        <Route path="/board" element={<DragDropBoard />} />
        <Route path="/three" element={<Threejs />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
