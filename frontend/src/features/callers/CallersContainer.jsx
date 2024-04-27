import { Card, ListGroup } from "react-bootstrap";
import Caller from "./Caller";
import LoadingSpinner from "../../components/screens/Spinners";
import useQueueCallsStore from "../../stores/queueCallStore";

const CallersContainer = () => {
  const { inQueueCalls: callers, isLoading, error } = useQueueCallsStore();

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

  if (!callers || callers?.length === 0) {
    return (
      <Card className="p-0">
        <Card.Header className="text-center font-bold">Callers</Card.Header>
        <ListGroup variant="flush">
          <p className="text-center">No Callers</p>
        </ListGroup>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <Card.Header className="text-center font-bold">Queue</Card.Header>
      <ListGroup variant="flush">
        {callers &&
          callers.map((caller) => (
            <ListGroup.Item className="p-0" key={caller._id}>
              <Caller caller={caller} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default CallersContainer;
