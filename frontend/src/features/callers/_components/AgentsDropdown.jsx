import PropTypes from "prop-types";

import { Dropdown } from "react-bootstrap";
import useAgentsStore from "../../../stores/agentStore";
import LoadingSpinner from "../../../components/screens/Spinners";
import useQueueCallsStore from "../../../stores/queueCallStore";
import { useToast } from "../../../../hooks/useToast";

const AgentsDropdown = ({ inQueueCall }) => {
  const {
    availableAgents,
    isLoading,
    fetchData: fetchAllAgents,
    fetchAvailableAgents,
  } = useAgentsStore();
  const { startCall, fetchAllInqueueCalls } = useQueueCallsStore();

  const { showToastMessage } = useToast();

  const handleClick = async (agentId, inQueueCall) => {
    try {
      const response = await startCall(inQueueCall?._id, agentId);
      await fetchAvailableAgents();
      await fetchAllInqueueCalls();
      await fetchAllAgents();

      showToastMessage(response.message, "success");
    } catch (err) {
      console.error(err);
      showToastMessage(err.message, "error");
    }
  };

  return (
    <Dropdown size="sm">
      <Dropdown.Toggle
        variant="success"
        className="flex justify-center align-middle"
        size="sm"
        disabled={isLoading || availableAgents.length === 0 ? true : false}
      >
        {isLoading && <LoadingSpinner />}
        {availableAgents.length === 0 ? "No Available Agents" : "Agents"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {availableAgents &&
          Array.isArray(availableAgents) &&
          availableAgents?.map((agent) => (
            <Dropdown.Item
              onClick={() => handleClick(agent?._id, inQueueCall)}
              key={agent?._id}
            >
              {agent?.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

AgentsDropdown.propTypes = {
  inQueueCall: PropTypes.object.isRequired,
};

export default AgentsDropdown;
