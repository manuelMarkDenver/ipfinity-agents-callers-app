import { Card, ListGroup } from "react-bootstrap";
import Agent from "./Agent";

import LoadingSpinner from "../../components/screens/Spinners";
import { useBoundStore } from "../../stores/useBoundStore";

const AgentsContainer = () => {
  const { agents, isLoading, error } = useBoundStore();
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

  if (!agents || agents?.length === 0) {
    return (
      <Card className="p-0">
        <Card.Header className="text-center font-bold">Agents</Card.Header>
        <ListGroup variant="flush">
          <p className="text-center">No Agents</p>
        </ListGroup>
      </Card>
    );
  }

  return (
    <Card className="p-0">
      <Card.Header className="text-center font-bold">Agents</Card.Header>
      <ListGroup variant="flush">
        {agents &&
          agents.map((agent) => (
            <ListGroup.Item className="p-0" key={agent._id}>
              <Agent agent={agent} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default AgentsContainer;
