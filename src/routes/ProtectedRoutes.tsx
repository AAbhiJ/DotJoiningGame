import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../layouts/protecteddLayout";
import Dashboard from "../pages/dashboard";
import About from "../pages/about";
import Contact from "../pages/contact/Index";
// import Login from "../pages/login";
import Practical from "../pages/practical";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/practical" element={<Practical />} />
      </Route>
    </Routes>
  )
}

export default ProtectedRoutes