// import { Link } from "react-router-dom";
// import Srff from "../../components/practicalPlayground/srff";
import { Button, Col, Row, Space } from "antd";

const Practical = () => {
  return (
    <>
      <Row>
        <Col span={16}>
          <Space wrap>
            <Button type="primary">Primary Button</Button>
          </Space>
        </Col>
        <Col span={8}>col</Col>
      </Row>
    </>
    // <div>
    //   <Link to={"/"}>Go to Dashboard Page</Link>
    //   <br/>
    //   Practical
    //   <Srff></Srff>
    // </div>
  );
};

export default Practical;
