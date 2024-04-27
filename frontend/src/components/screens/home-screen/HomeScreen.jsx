import { Container, Row, Col, Button } from "react-bootstrap/";
import AgentsContainer from "../../../features/agents/AgentsContainer";
import CallersContainer from "../../../features/callers/CallersContainer";
import useCallersStore from "../../../stores/callerStore";
import useQueueCallsStore from "../../../stores/queueCallStore";
import useAgentsStore from "../../../stores/agentStore";

const HomeScreen = () => {
  const { createRandomCaller } = useCallersStore();
  const { fetchData, fetchAvailableAgents, createRandomAgent } = useAgentsStore();
  const { fetchAllInqueueCalls } = useQueueCallsStore();

  const handleClickCreateAgent = async () => {
    await createRandomAgent();
    await fetchData();
    await fetchAvailableAgents();
    await fetchAllInqueueCalls();
  };

  const handleClickCreateCaller = async () => {
    await createRandomCaller();
    await fetchAvailableAgents();
    await fetchAllInqueueCalls();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center text-red-600">Home</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center text-cyan-600">Queue</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="flex justify-center">
          <Button variant="outline-success" onClick={handleClickCreateAgent}>
            Create Random Agent
          </Button>
        </Col>
        <Col className="flex justify-center">
          <Button variant="outline-info" onClick={handleClickCreateCaller}>
            Create Random Caller
          </Button>
        </Col>
      </Row>
      <Row className="gap-3">
        <Col>
          <Row>
            <AgentsContainer />
          </Row>
        </Col>
        <Col>
          <Row>
            <CallersContainer />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
