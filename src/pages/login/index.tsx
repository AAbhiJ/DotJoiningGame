import { Link } from "react-router-dom";
import { Col, Row, Space } from 'antd';
import {  message } from 'antd';
import { Button } from 'antd';
import { useEffect, useState } from "react";

const Login = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const onButtonClick = () => {
    setCount(count+1);
    messageApi.info(`Button Clicked ${count} times!`);
  }
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Use Effect");
  },[])
  


  return (
    <div className="App">
      <Button type="primary" onClick={onButtonClick}>Button</Button>
      <Space>{count}
      </Space>
      {contextHolder}
    </div>
  )

  // const [date, setDate] = useState(null);
  // const [messageApi, contextHolder] = message.useMessage();
  // const handleChange = (value) => {
  //   messageApi.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
  //   setDate(value);
  // };
  // return (
  //   <div style={{ width: 400, margin: '100px auto' }}>
  //     <DatePicker onChange={handleChange} />
  //     <div style={{ marginTop: 16 }}>
  //       {/* Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'} */}
  //       <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
  //     </div>
  //     {contextHolder}
  //   </div>
  // );
  return (
    <>
      <Row>
        <Col span={24}>col</Col>
      </Row>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>
          <Link to={"/"}>Dashboard</Link>
        </Col>
      </Row>
    </>
  );
};

export default Login;
