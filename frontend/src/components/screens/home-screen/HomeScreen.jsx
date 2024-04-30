import { useCallback, useEffect, useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap/";
import AgentsContainer from "../../../features/agents/AgentsContainer";
import CallersContainer from "../../../features/callers/CallersContainer";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../../../hooks/useToast";
import { useBoundStore } from "../../../stores/useBoundStore";
import LoadingSpinner from "../Spinners";

const HomeScreen = () => {
  const [createCallers, setCreateCallers] = useState(false);
  const {
    createRandomAgent,
    isAgentsLoading,
    agentsError,
    createCallerAndQueueCall,
    isCallersQueueLoading,
    isCallersQueueError,
  } = useBoundStore();

  useEffect(() => {}, []);

  const { showToastMessage } = useToast();

  const handleClickCreateAgent = async () => {
    try {
      const response = await createRandomAgent();
      showToastMessage(response.message, "success");
    } catch (err) {
      console.err(err.message);
      showToastMessage(err.message, "error");
    }
  };

  const createCallersInterval = useCallback(async () => {
    try {
      const response = await createCallerAndQueueCall();
      console.log("x");
      showToastMessage(response.message, "success");
    } catch (err) {
      console.err(err.message);
      showToastMessage(err.message, "error");
    }
  }, [createCallerAndQueueCall, showToastMessage]);

  useEffect(() => {
    let intervalId = null;

    //random interval from 3 to 5
    const randomSeconds = Math.floor(Math.random() * 5) + 3 * 1000;

    if (createCallers && !intervalId) {
      intervalId = setInterval(createCallersInterval, randomSeconds);
    } else if (!createCallers && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [createCallers, createCallersInterval]);

  const handleClickCreateCallers = () => {
    setCreateCallers(!createCallers);
  };

  // const handleClickCreateCaller = async () => {
  //   try {
  //     const response = await createCallerAndQueueCall();
  //     showToastMessage(response.message, "success");
  //   } catch (err) {
  //     console.err(err.message);
  //     showToastMessage(err.message, "error");
  //   }
  // };

  if (agentsError || isCallersQueueError) {
    showToastMessage(agentsError || isCallersQueueError, "error");
  }

  return (
    <Container fluid className="p-5">
      <ToastContainer />
      <Row>
        <Col sm={12}>
          <h1 className="text-center text-slate-600 mb-10">Dashboard</h1>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={6} className="mb-4 md:mb-0">
          <Row>
            <Col className="flex justify-center mb-3">
              <Button
                variant="success"
                onClick={handleClickCreateAgent}
                disabled={isAgentsLoading}
              >
                Create Agent
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              {isAgentsLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="overflow-y-auto">
                  <AgentsContainer />
                </div>
              )}
            </Col>
          </Row>
        </Col>

        <Col sm={12} md={6}>
          <Row>
            <Col className="flex justify-center mb-3">
              <Button
                variant={!createCallers ? "success" : "danger"}
                onClick={handleClickCreateCallers}
                disabled={isCallersQueueLoading}
              >
                {!createCallers ? "Create Callers" : "Stop Creating Callers"}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {isCallersQueueLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="h-[40rem] overflow-y-auto">
                  <CallersContainer />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
