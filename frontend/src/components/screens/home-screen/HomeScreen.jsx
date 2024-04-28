import { Container, Row, Col, Button } from "react-bootstrap/";
import AgentsContainer from "../../../features/agents/AgentsContainer";
import CallersContainer from "../../../features/callers/CallersContainer";
import useCallersStore from "../../../stores/callerStore";
import useQueueCallsStore from "../../../stores/queueCallStore";
import useAgentsStore from "../../../stores/agentStore";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../../../hooks/useToast";

const HomeScreen = () => {
  const { createRandomCaller } = useCallersStore();
  const { isLoading, fetchData, fetchAvailableAgents, createRandomAgent } =
    useAgentsStore();
  const { fetchAllInqueueCalls } = useQueueCallsStore();

  const { showToastMessage } = useToast();

  const handleClickCreateAgent = async () => {
    try {
      const response = await createRandomAgent();
      await fetchData();
      await fetchAvailableAgents();
      await fetchAllInqueueCalls();
      showToastMessage(response.message, "success");
    } catch (err) {
      console.err(err.message);
      showToastMessage(err.message, "error");
    }
  };

  const handleClickCreateCaller = async () => {
    try {
      const response = await createRandomCaller();
      await fetchAvailableAgents();
      await fetchAllInqueueCalls();
      showToastMessage(response.message, "success");
    } catch (err) {
      console.err(err.message);
      showToastMessage(err.message, "error");
    }
  };

  return (
    <Container>
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
                disabled={isLoading}
              >
                Create Agent
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <AgentsContainer />
            </Col>
          </Row>
        </Col>

        <Col sm={12} md={6}>
          <Row>
            <Col className="flex justify-center mb-3">
              <Button
                variant="success"
                onClick={handleClickCreateCaller}
                disabled={isLoading}
              >
                Create Caller
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <CallersContainer />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
