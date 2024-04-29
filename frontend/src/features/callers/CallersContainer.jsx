import { Card, ListGroup } from "react-bootstrap";
import Caller from "./Caller";
import LoadingSpinner from "../../components/screens/Spinners";
import { useBoundStore } from "../../stores/useBoundStore";

const CallersContainer = () => {
  const queue = useBoundStore((state) => state.allQueueCalls);
  const filteredQueue = queue?.filter((queue) => queue.inQueue === true);
  const { isCallersLoading: isLoading, callerError: error } = useBoundStore();

  if (isLoading) {
    return (
      <Card>
        <Card.Header className="text-center font-bold">Agents</Card.Header>
        <div className="py-10 flex justify-center align-center">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!filteredQueue || filteredQueue?.length === 0) {
    return (
      <Card className="p-0">
        <Card.Header className="text-center font-bold">Callers</Card.Header>
        <ListGroup variant="flush">
          <p className="text-center">No callers in queue</p>
        </ListGroup>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <Card.Header className="text-center font-bold">Queue</Card.Header>
      <ListGroup variant="flush">
        {filteredQueue &&
          filteredQueue.map((queue, index) => (
            <ListGroup.Item className="p-0" key={index}>
              <Caller caller={queue} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default CallersContainer;
