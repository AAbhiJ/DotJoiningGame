import { Link } from "react-router-dom";
import Srff from "../../components/practicalPlayground/srff";

const Practical = () => {
  return (
    <div>
      <Link to={"/"}>Go to Dashboard Page</Link>
      <br/>
      Practical
      <Srff></Srff>
    </div>
  );
};

export default Practical;
