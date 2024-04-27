import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Button, Stack } from "react-bootstrap";
import useQueueCallsStore from "../../stores/queueCallStore";

import CustomButton from "../../components/CustomButton";
import useAgentsStore from "../../stores/agentStore";

const Agent = ({ agent }) => {
  const { activeCall, name, availableForCall, currentCaller } = agent;

  const { fetchData, fetchAvailableAgents } = useAgentsStore();

  const { endCall } = useQueueCallsStore();

  const handleEndCallClick = async () => {
    await endCall(activeCall._id);
    await fetchData();
    await fetchAvailableAgents();
  };

  return (
    <Stack
      direction="horizontal"
      className={`${
        availableForCall ? "bg-green-400" : "bg-red-400"
      }  p-1 text-center`}
    >
      <p className="m-0">
        {name}
        {availableForCall ? "Avail" : ` -> ${currentCaller?.phoneNumber}`}
      </p>
      <div className="ms-auto flex gap-1">
        {!availableForCall && (
          <CustomButton title="End Call" func={handleEndCallClick} />
        )}
        {/* <Button variant="primary" className="mr-2">
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </Button> */}
      </div>
    </Stack>
  );
};

Agent.propTypes = {
  agent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    activeCall: PropTypes.object,
    availableForCall: PropTypes.bool.isRequired,
    currentCaller: PropTypes.object,
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Agent;
