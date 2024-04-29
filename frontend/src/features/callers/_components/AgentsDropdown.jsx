import PropTypes from "prop-types";

import { Dropdown } from "react-bootstrap";
import LoadingSpinner from "../../../components/screens/Spinners";
import { useToast } from "../../../../hooks/useToast";
import { useBoundStore } from "../../../stores/useBoundStore";

const AgentsDropdown = ({ inQueueCall }) => {
  const agents = useBoundStore((state) => state.agents);
  const availableAgents = agents.filter((agent) => agent.availableForCall);
  const {
    fetchAgentsData,
    fetchQueueCallsData,
    startCall,
    isAllQueueCallsLoading,
  } = useBoundStore();

  const { showToastMessage } = useToast();

  const handleClick = async (agentId, inQueueCall) => {
    try {
      const response = await startCall(inQueueCall?._id, agentId);

      await fetchAgentsData();
      await fetchQueueCallsData();

      showToastMessage(response?.message, "success");
    } catch (err) {
      console.error(err);
      showToastMessage(err?.message, "error");
    }
  };

  return (
    <Dropdown size="sm">
      <Dropdown.Toggle
        variant="primary"
        className="flex justify-center align-middle"
        size="sm"
        disabled={
          isAllQueueCallsLoading || availableAgents.length === 0 ? true : false
        }
      >
        {isAllQueueCallsLoading && <LoadingSpinner />}
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
