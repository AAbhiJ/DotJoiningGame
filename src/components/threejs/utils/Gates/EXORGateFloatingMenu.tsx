import { useSelector } from 'react-redux';
import { FlipFlopCanvasStore, selectPractical, resetLines, setSwitch } from '../../../../store/slices/FlipFlopCanvasSlice';

import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Radio, RadioChangeEvent, Row, Space, Table, Typography, notification } from 'antd';
import { useAppDispatch } from '../../../../store';
import { CorrectClockedFlipFlopConnections, CorrectSRFlipFlopConnections } from '../../utils/Gates/GatesConnection';
import { GATES_CONFIG } from './gates.config';
import { ApiNetworkService } from '../../../../network/apiNetworkService';

import { auth, db } from '../../../../config/firebase';
import { DocumentSnapshot, doc, onSnapshot, updateDoc } from "firebase/firestore";

import {
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import moment from 'moment';


interface FlipFlopResultTable {
  key: string;
  ip1: number;
  ip2?: number;
  ip3?: number;
  Q?: number | undefined;
  _Q?: number | undefined;
}

const clockedFlipFlopTableDefaultData: FlipFlopResultTable[] = [
  {
    key: '1',
    ip1: 0,
    ip2: 0,
    ip3: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '2',
    ip1: 0,
    ip2: 1,
    ip3: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '3',
    ip1: 1,
    ip2: 0,
    ip3: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '4',
    ip1: 1,
    ip2: 1,
    ip3: 0,
    Q: undefined,
    _Q: undefined
  },
];
const srFlipFlopTableDefaultData: FlipFlopResultTable[] = [
  {
    key: '1',
    ip1: 0,
    ip2: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '2',
    ip1: 0,
    ip2: 1,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '3',
    ip1: 1,
    ip2: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '4',
    ip1: 1,
    ip2: 1,
    Q: undefined,
    _Q: undefined
  },
];
const dFlipFlopTableDefaultData: FlipFlopResultTable[] = [
  {
    key: '1',
    ip1: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '2',
    ip1: 0,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '3',
    ip1: 1,
    Q: undefined,
    _Q: undefined
  },
  {
    key: '4',
    ip1: 1,
    Q: undefined,
    _Q: undefined
  },
];

const ff = doc(db, "Projects_DB", "FlipFlop");

const EXORGateFloatingMenu = () => {

  //temp
  const USERID = 3;

  // state
  const dispatch = useAppDispatch();
  const flipFlopState = useSelector(FlipFlopCanvasStore)

  const flipFlopPracticalOptions = GATES_CONFIG;


  const getTableDefaultData = (selectedPractical: string) => {
    let data: any[] = []
    if (selectedPractical === 'SR') {
      data = [...srFlipFlopTableDefaultData];
    }
    else if (selectedPractical === 'CLOCKED') {
      data = [...clockedFlipFlopTableDefaultData];
    }
    else if (selectedPractical === 'D') {
      data = [...dFlipFlopTableDefaultData];
    }
    return data
  }

  const [open, setOpen] = useState(false);
  const [tableDataSource, setTableDataSource] = useState(getTableDefaultData("SR"));
  const [dataSource, setDataSource] = useState(tableDataSource);
  const [tableData, setTableData] = useState<FlipFlopResultTable[]>([]);
  const [selectedPracticalItem, setSelectedPracticalItem] = useState(flipFlopState.selectedPractical);
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false)

  let unsubscribe: any = null;

  const handleFirebaseInit = async () => {
    await signInWithEmailAndPassword(auth, "newadmin@gmail.com", "pass123").then(() => {
      // alert("Logged In!");
      return true;
    }).catch((error) => {
      const errorMessage = error.message;
      // alert("Error when Logging!");
      throw errorMessage;

    });

    unsubscribe = onSnapshot(ff, (doc: DocumentSnapshot<any>): void => {
      if (!doc || doc === undefined || doc?._document === null) return;
      const QIp = doc.data().Q;
      const _QIp = doc.data()._Q

      // handle result on off logic
      dispatch(setSwitch({switch : "SWITCH5",value : QIp}));
      dispatch(setSwitch({switch : "SWITCH6",value : _QIp}));

      console.log(QIp, _QIp);
      console.log("Current data: ", doc.data());
    });
  }

  const handleFirebaseDestroy = async () => {
    await signOut(auth);
  }

  useEffect(() => {
    handleFirebaseInit();
    return () => {
      handleFirebaseDestroy();
      if (unsubscribe) unsubscribe();
      console.log("called destroy");
    }
  }, []);



  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChangeFlipFlopPractical = ({ target: { value } }: RadioChangeEvent) => {
    if (tableData.length !== 0) {
      showResetInputToast();
      return false;
    }
    setTableDataSource(getTableDefaultData(value));
    dispatch(selectPractical(value));
    setSelectedPracticalItem(value);
    return true;
  };

  useEffect(() => {
    if (tableDataSource) {
      setDataSource(tableDataSource);
    }
  }, [tableDataSource])

  useEffect(() => {
    if(open) {
      getStudentPracticalData(selectedPracticalItem)
    }
  }, [open, selectedPracticalItem])

  const getStudentPracticalData = (selected_practical: string) => {
    // const payload = {
    //   params: {
    //     userId: 3,
    //     practicalId: 1,
    //     submittedDate: "2024-01-13"
    //   }
    // };
    // console.log("monnet", moment().format("YYYY-MM-DD"))
    const payload = {
      params: {
        userId: USERID,
        practicalId: getFlipFlopConfig(selected_practical)?.id,
        submittedDate: moment().format("YYYY-MM-DD")
      }
    }
    ApiNetworkService.getPracticalData(payload).then((response) => {
      console.log(response);
      if (response.status === 200) {
        // const parsedData = JSON.parse(data);
        const data = response?.data;
        // console.log('parsedData', data)
        const practicalData = data?.data[0]?.submittedvalue;
        // console.log(practicalData);
        const tableData = getTableDefaultData(selected_practical);
        for (const key in practicalData) {
          console.log('key', practicalData[key].key)
          let index = 0
          for (const key1 in tableData) {
            console.log('key1', tableData[index].key)
            if (practicalData[key].key === tableData[index].key) {
              console.log('l1', practicalData[key], tableData[index]);
              
              tableData[index] = practicalData[key]
            }
            index++
          }
          // if (`${key}` === practicalData[index].key){ 
          //   tableData[index] = practicalData[key]
          // }
          // tableData[index] = practicalData[key]
          // tableData[index].key = key
        }
        console.log(tableData);
        // setTableData(parsedData);
        setTableDataSource(tableData);
      }
    }).catch((error) => {
      const message = error?.response.data.message;
      const config = {
        message: "Error Fetching!",
        description: message || "Some error occurred during practical fetching!"
      }
      notification.warning(config);
    }) 
  }

  /** Notification Connection Toast */
  const showWrongConnectionToast = () => {
    const config = {
      message: "Wrong connections!",
      description: "Please check the connections!"
    }
    notification.warning(config);
  }

  const showResetInputToast = () => {
    const config = {
      message: "Cant change Practical!",
      description: "Please reset or submit current practical readings!"
    }
    notification.warning(config);
  }

  const ValidateSRConnection = () => {
    /** Get all the conenction indexes */
    const allConnections: [string, string][] = flipFlopState.allLines.map((ele) => ele.getIndexes());

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

  const ValidateClockedConnection = () => {
    /** HANDLE EDGE CASE OF 
     *  [
          "3.2",
          "SWITCHPOINT2"
        ],
        AND 
        [
          "4.1",
          "SWITCHPOINT3"
        ],
     * 
     */

    /** Get all the conenction indexes */
    const allConnections: [string, string][] = flipFlopState.allLines.map((ele) => ele.getIndexes());

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
      for (let i = 0; i < CorrectClockedFlipFlopConnections.length; i++) {
        if ((connection[0] === CorrectClockedFlipFlopConnections[i][0] && connection[1] === CorrectClockedFlipFlopConnections[i][1]) ||
          (connection[1] === CorrectClockedFlipFlopConnections[i][0] && connection[0] === CorrectClockedFlipFlopConnections[i][1])) {
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

  const ValidateDConnection = () => {
    throw "Working";
    return;
    /** Get all the conenction indexes */
    const allConnections: [string, string][] = flipFlopState.allLines.map((ele) => ele.getIndexes());

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

  const ValidateConnection = () => {
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
    const selectedPracConfig = getFlipFlopConfig(flipFlopState.selectedPractical);
    if (selectedPracConfig?.value === 'SR') {
      return ValidateSRConnection();
    }
    if (selectedPracConfig?.value === 'CLOCKED') {
      return ValidateClockedConnection();
    }
    if (selectedPracConfig?.value === 'D') {
      return ValidateDConnection();
    }
  }

  const onRun = () => {
    console.log("Runing");
    const isValid = ValidateConnection();
    if (isValid) {
      runResult();
      // Update to Firebase
      console.log("Correct Connection");
    } else {
      showWrongConnectionToast();
      console.log("Wrong Connection");
    }
  };

  const runResult = () => {

    const switch1 = flipFlopState.switch.SWITCH1;
    const switch2 = flipFlopState.switch.SWITCH2;
    const switch3 = flipFlopState.switch.SWITCH4;

    updateDoc(ff, {
      'ip1': switch1,
      'ip2': switch2,
      'ip3': switch3,
    });
  }

  const getFlipFlopConfig = (selectedPractical: string) => {
    return flipFlopPracticalOptions.find((gate) => gate.value === selectedPractical);
  }

  const onSubmit = async () => {

    // return;
    
    try {

      console.log({ flipFlopState, tableData, selectedPracConfig: getFlipFlopConfig(flipFlopState.selectedPractical) });

      console.log(flipFlopState.allLines.map((line) => line.getIndexes()));
  
      const practData = []
  
      practData.push({
        practicalId: getFlipFlopConfig(flipFlopState.selectedPractical)?.id,
        value: tableData
      })
  
      const payload = {
        userId: USERID,
        practical_data: practData
      }
  
      console.log(payload);  

      // const payload = {
      //   userId: USERID,
      //   practicalId: getFlipFlopConfig(flipFlopState.selectedPractical)?.id,
      //   value: JSON.stringify(tableData)
      // };
      // const resposne = await 
      ApiNetworkService.submitPractical(payload)
      .then((response) => {

        console.log(response);
        if (response.status === 200) {
          const config = {
            message: "Practical Submitted",
          }
          notification.success(config);
          getStudentPracticalData(selectedPracticalItem)
          setIsInputChanged(false)
        } else {
          throw "Error";
        }
      }).catch ((err) => {
        console.log(err);
        const message = err?.response.data.message;
        const config = {
          message: "Error Submitting!",
          description: message || "Some error occurred during practical submitting!"
        }
        notification.warning(config);
      })
  }
  catch (error) {
    console.log(error);
    const config = {
      message: "Error Submitting!",
      description: "Some error occurred during practical submitting!"
    }
    notification.warning(config);
  }
}

  const getColumnWidth = () => {
    if (flipFlopState.selectedPractical === 'SR') {
      return "25%";
    }
    else if(flipFlopState.selectedPractical === 'CLOCKED') {
      return "20%";
    }
    else if(flipFlopState.selectedPractical === 'D') {
      return "33%";
    }
  }



  const clockedFlipFlopColumns = [
    {
      title: 'Input 1',
      dataIndex: 'ip1',
      key: 'ip1',
      width: getColumnWidth(),
    },
    {
      title: 'Input 2',
      dataIndex: 'ip2',
      key: 'ip2',
      width: getColumnWidth(),
    },
    {
      title: 'Input 3',
      dataIndex: 'ip3',
      key: 'ip3',
      width: getColumnWidth(),
    },
    {
      title: 'Q',
      dataIndex: 'Q',
      key: 'Q',
      width: getColumnWidth(),
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          type='number'
          max={1}
          min={0}
          name="Q"
          value={record.Q}
          onChange={(e) => handleTable(e, record)} />
      },
    },
    {
      title: '_Q',
      dataIndex: '_Q',
      key: '_Q',
      width: getColumnWidth(),
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          type='number'
          max={1}
          min={0}
          name="_Q"
          value={record._Q}
          onChange={(e) => handleTable(e, record)}
        />
      },
    },
  ];
  const srFlipFlopColumns = [
    {
      title: 'Input 1',
      dataIndex: 'ip1',
      key: 'ip1',
      width: getColumnWidth(),
    },
    {
      title: 'Input 2',
      dataIndex: 'ip2',
      key: 'ip2',
      width: getColumnWidth(),
    },
    {
      title: 'Q',
      dataIndex: 'Q',
      key: 'Q',
      width: getColumnWidth(),
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          type='number'
          max={1}
          min={0}
          name="Q"
          value={record.Q}
          onChange={(e) => handleTable(e, record)} />
      },
    },
    {
      title: '_Q',
      dataIndex: '_Q',
      key: '_Q',
      width: getColumnWidth(),
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          type='number'
          max={1}
          min={0}
          name="_Q"
          value={record._Q}
          onChange={(e) => handleTable(e, record)}
        />
      },
    },
  ];
  const dFlipFlopColumns = [
    {
      title: 'Input 1',
      dataIndex: 'ip1',
      key: 'ip1',
      width: getColumnWidth(),
    },
    {
      title: 'Q',
      dataIndex: 'Q',
      key: 'Q',
      width: getColumnWidth(),
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          type='number'
          max={1}
          min={0}
          name="Q"
          value={record.Q}
          onChange={(e) => handleTable(e, record)} />
      },
    },
    {
      title: '_Q',
      dataIndex: '_Q',
      key: '_Q',
      width: getColumnWidth(),
      render: (text: string, record: FlipFlopResultTable) => {
        return <Input
          type='number'
          max={1}
          min={0}
          name="_Q"
          value={record._Q}
          onChange={(e) => handleTable(e, record)}
        />
      },
    },
  ];

  const handleTable = (e: any, record: FlipFlopResultTable) => {
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

    setTableData(newData);
    setIsInputChanged(true)
    /** Datasource */
    const newDataSource = dataSource.map((item) => {
      if (item.key === record.key) {
        found = true;
        return { ...item, [targetName]: targetValue };
      }
      return item;
    });
    setTableDataSource(newDataSource);
  };

  const onClearTable = () => {
    console.log("1234567", getTableDefaultData(flipFlopState.selectedPractical));
    setTableDataSource(getTableDefaultData(flipFlopState.selectedPractical));
    setIsInputChanged(false)
    // setTableData(() => { return [] });
  }
  
  const onClearCircuit = () => {
    dispatch(resetLines());
  }

  const getFlipFlopColumns = (selectedPractical: string) => {
    if (selectedPractical === 'SR') {
      return srFlipFlopColumns;
    }
    else if (selectedPractical === 'CLOCKED') {
      return clockedFlipFlopColumns;
    }
    else if (selectedPractical === 'D') {
      return dFlipFlopColumns;
    }
  }
  
  return (
    <>
    {console.log("dataSource", dataSource)}
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
            <Button onClick={onClearTable} type="secondary">
              Clear Table
            </Button>
            <Button onClick={onClearCircuit} type="secondary">
              Clear Circiut
            </Button>
          </Space>
        }
        >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Title level={5}>Practical Type</Typography.Title>
              <Radio.Group defaultValue={flipFlopState.selectedPractical || flipFlopPracticalOptions[0].value} options={flipFlopPracticalOptions} onChange={onChangeFlipFlopPractical} value={flipFlopState.selectedPractical} optionType="button" />
            </Col>
            <Col span={24}>
              <Table dataSource={dataSource} columns={getFlipFlopColumns(flipFlopState.selectedPractical)} size="small" pagination={false} />
            </Col>
          </Row>  
        </Form>
      </Drawer>
    </>
  )
}

export default EXORGateFloatingMenu