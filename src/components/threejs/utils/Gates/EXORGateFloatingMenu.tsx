import { useSelector } from 'react-redux';
import { FlipFlopCanvasStore, selectPractical } from '../../../../store/slices/FlipFlopCanvasSlice';

import { useState } from 'react';
import { Button, Col, Drawer, Form, Input, Radio, RadioChangeEvent, Row, Space, Table, Typography, notification } from 'antd';
import { useAppDispatch } from '../../../../store';
import { CorrectSRFlipFlopConnections } from '../../utils/Gates/GatesConnection';

interface FlipFlopResultTable {
  key: string;
  ip1: number;
  ip2: number;
  Q?: number;
  _Q?: number;
}

const EXORGateFloatingMenu = () => {
  // state
  const dispatch = useAppDispatch();
  const flipFlopState = useSelector(FlipFlopCanvasStore)

  const flipFlopPracticalOptions = [
    { label: 'SR', value: 'SR' },
    { label: 'Clocked', value: 'CLOCKED' },
    { label: 'D', value: 'D' },
  ];

  const COL_WIDTH: string = "25%";

  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<FlipFlopResultTable[]>([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChangeFlipFlopPractical = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(selectPractical(value));
  };

  const showWrongConnectionToast = () => {
    const config = {
      message: "Wrong connections!",
      description: "Please check the connections!"
    }
    notification.warning(config)
  }

  const ValidateConnection = () => {
    /** Get all the conenction indexes */
    const allConnections: [string, string][] = flipFlopState.allLines.map((ele) => ele.getIndexes());
    //   const allConnections = [
    //     [
    //         "SWITCHPOINT2",
    //         "3.2"
    //     ],
    //     [
    //         "3.1",
    //         "3.2"
    //     ],
    //     [
    //         "4.1",
    //         "4.2"
    //     ],
    //     [
    //         "SWITCHPOINT4",
    //         "4.2"
    //     ],
    //     [
    //         "4.0",
    //         "2.2"
    //     ],
    //     [
    //         "2.0",
    //         "SWITCHPOINT6"
    //     ],
    //     [
    //         "2.1",
    //         "1.0"
    //     ],
    //     [
    //         "1.2",
    //         "2.0"
    //     ],
    //     [
    //         "SWITCHPOINT5",
    //         "1.0"
    //     ],
    //     [
    //         "1.1",
    //         "3.0"
    //     ]
    // ];

    /** if length is not equal to 10, wrong connections */
    if (allConnections.length !== 10) {
      return false;
    }


    /** 
     * check current connection with CorrectSRFlipFlopConnections
     * we return true if the connection is not connection, so the NotConencted will have all not matching connection indexes.
     * Ideally NotConnected should be empty, means current connections are all correct.  
     */
    const NotConnected = allConnections.filter((connection) => {
      for (let i = 0; i < CorrectSRFlipFlopConnections.length; i++) {
        if ((connection[0] === CorrectSRFlipFlopConnections[i][0] && connection[1] === CorrectSRFlipFlopConnections[i][1]) ||
          (connection[1] === CorrectSRFlipFlopConnections[i][0] && connection[0] === CorrectSRFlipFlopConnections[i][1])) {
          return false;
        }
      }
      return true;
    })

    if (NotConnected.length !== 0) {
      return false;
    }
    return true;
  }

  const onRun = () => {
    console.log("Runing");
    const isValid = ValidateConnection();
    if(isValid){
      // Update to Firebase
      console.log("Correct Connection");
    }else{
      showWrongConnectionToast();
      console.log("Wrong Connection");
    }
  };

  const onSubmit = () => {
    console.log({ flipFlopState, tableData });
  };

  const dataSource: FlipFlopResultTable[] = [
    {
      key: '1',
      ip1: 0,
      ip2: 0,
    },
    {
      key: '2',
      ip1: 0,
      ip2: 1,
    },
    {
      key: '3',
      ip1: 1,
      ip2: 0,
    },
    {
      key: '4',
      ip1: 1,
      ip2: 1,
    },
  ];

  const columns = [
    {
      title: 'Input 1',
      dataIndex: 'ip1',
      key: 'ip1',
      width: COL_WIDTH,
    },
    {
      title: 'Input 2',
      dataIndex: 'ip2',
      key: 'ip2',
      width: COL_WIDTH,
    },
    {
      title: 'Q',
      dataIndex: 'Q',
      key: 'Q',
      width: COL_WIDTH,
      render: () => {
        return <Input type="text" />
      },
    },
    {
      title: '_Q',
      dataIndex: '_Q',
      key: '_Q',
      width: COL_WIDTH,
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          value={record._Q}
          name="_Q"
          onChange={(e) => {
            let found = false;
            const targetName = e.target.name;
            const targetValue = parseInt(e.target.value) | 0;
            let newData = tableData.map((item) => {
              if (item.key === record.key) {
                found = true;
                return { ...item, [targetName]: targetValue };
              }
              return item;
            });

            if (!found) {
              newData = [...newData, { ...record, [targetName]: targetValue }];
            }

            console.log(newData);
            setTableData(newData);
          }}
        />
      },
    },
  ];


  return (
    <>
      <Row gutter={8}>
        <Col>
          <Button type="primary" onClick={showDrawer}>
            Menu
          </Button>
        </Col>
        <Col>
          <Button type="default" onClick={onRun}>
            Run
          </Button>
        </Col>
      </Row>
      <Drawer
        title="Menu"
        width={720}
        onClose={onClose}
        open={open}
        style={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Typography.Title level={5}>Practical Type</Typography.Title>
              <Radio.Group options={flipFlopPracticalOptions} onChange={onChangeFlipFlopPractical} value={flipFlopState.selectedPractical} optionType="button" />
              {/* <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item> */}
            </Col>
            <Col span={24}>
              <Table dataSource={dataSource} columns={columns} size="small" />;
              {/* <Form.Item
                  name="url"
                  label="Url"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item> */}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default EXORGateFloatingMenu