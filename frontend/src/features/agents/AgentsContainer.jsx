import { Card, ListGroup, Table } from "react-bootstrap";
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
      <Table striped bordered hover responsive>
        <thead>
          <tr className='text-center'>
            <th>Status</th>
            <th>Agent ID</th>
            <th>Name</th>
            <th>Caller Name</th>
            <th>Caller Phone Number</th>
            <th>Handling Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents &&
            Array.isArray(agents) &&
            agents.map((agent) => <Agent agent={agent} key={agent._id} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export default AgentsContainer;
