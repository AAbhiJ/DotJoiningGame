import { useSelector } from 'react-redux';
import { TheveninCanvasStore, resetLines, selectPractical } from '../../../../store/slices/TheveninCanvasSlice';

import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Radio, RadioChangeEvent, Row, Space, notification, Input } from 'antd';
import { useAppDispatch } from '../../../../store';
import { CorrectClockedFlipFlopConnections, CorrectSRFlipFlopConnections } from '../Gates/GatesConnection';
import { GATES_CONFIG } from './thevenin.config';
import { ApiNetworkService } from '../../../../network/apiNetworkService';

import { auth, db } from '../../../../config/firebase';
import { DocumentSnapshot, doc, onSnapshot, updateDoc } from "firebase/firestore";

import {
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import Title from 'antd/es/typography/Title';

type FieldType = {
  voltage?: number;
  vth?: number;
  rth?: number;
  isChanged: boolean;
};


const thevenin = doc(db, "Projects_DB", "Thevinen");

const onFinish = (values: FieldType) => {
  console.log('Success:', values);
};



const TheveninGateFloatingMenu = () => {

  //temp
  const USERID = 3;

  // state
  const dispatch = useAppDispatch();
  const TheveninState = useSelector(TheveninCanvasStore)

  const TheveninPracticalOptions = GATES_CONFIG;

  const [open, setOpen] = useState(false);
  const [resultData] = Form.useForm();

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

    unsubscribe = onSnapshot(thevenin, (doc: DocumentSnapshot<any>): void => {
      if (!doc || doc === undefined || doc?._document === null) return;
      const volt = doc.data().op_volt;
      const rth = doc.data().op_rth;
      const vth = doc.data().op_vth;

      // handle result on off logic
      // dispatch(setSwitch({ switch: "SWITCH5", value: QIp }));
      // dispatch(setSwitch({ switch: "SWITCH6", value: _QIp }));

      console.log(volt, rth, vth);
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
    }
  }, []);



  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChangeTheveninPractical = ({ target: { value } }: RadioChangeEvent) => {
    if (resultData.getFieldValue('isChanged')) {
      showResetInputToast();
      return false;
    }
    dispatch(selectPractical(value));
    return true;
  };

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

  const showCustomWarningToast = (message: string) => {
    const config = {
      message: "Custom Message",
      description: message
    }
    notification.warning(config);
  }

  const ValidateVoltageConnection = () => {
    /** Get all the conenction indexes */
    const allConnections: [string, string][] = TheveninState.allLines.map((ele) => ele.getIndexes());

    /** if length is not equal to 10, wrong connections */
    if (allConnections.length !== 10) {
      return false;
    }

    /** 
     * check current connection with CorrectSRxxFlipFlopConnections
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

  const ValidateVthConnection = () => {
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
    const allConnections: [string, string][] = TheveninState.allLines.map((ele) => ele.getIndexes());

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

  const ValidateRthConnection = () => {
    throw "Working";
    return;
    /** Get all the conenction indexes */
    const allConnections: [string, string][] = TheveninState.allLines.map((ele) => ele.getIndexes());

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
    const selectedPracConfig = getFlipFlopConfig(TheveninState.selectedPractical);
    if (selectedPracConfig?.value === 'VOLTAGE') {
      return ValidateVoltageConnection();
    }
    if (selectedPracConfig?.value === 'VTH') {
      return ValidateVthConnection();
    }
    if (selectedPracConfig?.value === 'RTH') {
      return ValidateRthConnection();
    }
    return false;
  }

  const onRun = () => {
    const isValid = ValidateConnection();
    if (isValid) {
      runResult();
      console.log("Correct Connection");
    } else {
      showWrongConnectionToast();
      console.log("Wrong Connection");
    }
  };

  const runResult = () => {

    const gateConfig = getFlipFlopConfig(TheveninState.selectedPractical);

    updateDoc(thevenin, {
      'circuit': gateConfig?.KIT_ID,
      // 'occupied':true,
      /* TODO : FETCH USER ID */
    });
    showCustomWarningToast("Need to fetch userid and send to firebase");
  }

  const getFlipFlopConfig = (selectedPractical: string) => {
    return TheveninPracticalOptions.find((gate) => gate.value === selectedPractical);
  }

  const onSubmit = async () => {

    console.log({ TheveninState, tableData, selectedPracConfig: getFlipFlopConfig(TheveninState.selectedPractical) });

    console.log(TheveninState.allLines.map((line) => line.getIndexes()));

    return;
    try {
      const payload = {
        userId: USERID,
        practicalId: getFlipFlopConfig(TheveninState.selectedPractical)?.id,
        value: JSON.stringify(tableData)
      };
      const resposne = await ApiNetworkService.submitPractical(payload);
      console.log(resposne);
      if (resposne.status === 201) {
        const config = {
          message: "Practical Submitted",
        }
        notification.success(config);
      } else {
        throw "Error";
      }
    } catch (error) {
      const message = error?.response.data.message;
      const config = {
        message: "Error Submitting!",
        description: message || "Some error occurred during practical submitting!"
      }
      notification.warning(config);
    }
  };

  const onClearTable = () => {
    alert("working");
    resultData.resetFields();
  }

  const onClearCircuit = () => {
    dispatch(resetLines());
  }

  const onFormChange = (values: FieldType) => {
    if (!resultData.getFieldValue('isChanged')) resultData.setFieldValue('isChanged', true);
    console.log("he", values);
  }

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
            <Button onClick={onClearTable} type="secondary">
              Clear Table
            </Button>
            <Button onClick={onClearCircuit} type="secondary">
              Clear Circiut
            </Button>
          </Space>
        }
      >
        <Form
          //layout="vertical"
          form={resultData}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          name="theveninResult"
          onFinish={onFinish}
          onValuesChange={onFormChange}
          initialValues={{ isChanged: false }}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Practical Type</Title>
              <Radio.Group defaultValue={TheveninState.selectedPractical || TheveninPracticalOptions[0].value} options={TheveninPracticalOptions} onChange={onChangeTheveninPractical} value={TheveninState.selectedPractical} optionType="button" />
            </Col>
            <Col span={24}>
              <Title level={5}>Result</Title>
            </Col>
            <Col span={12}>

              <Form.Item<FieldType>
                label="Voltage"
                name="voltage"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="VTH"
                name="vth"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="RTH"
                name="rth"

                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>

          </Row>
        </Form>
      </Drawer >
    </>
  )
}

export default TheveninGateFloatingMenu