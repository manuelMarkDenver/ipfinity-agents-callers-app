import PropTypes from "prop-types";

import { Stack, Badge } from "react-bootstrap";
import useQueueCallsStore from "../../stores/queueCallStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import CustomButton from "../../components/CustomButton";
import useAgentsStore from "../../stores/agentStore";
import { useToast } from "../../../hooks/useToast";

const Agent = ({ agent }) => {
  const { activeCall, name, availableForCall, currentCaller } = agent;

  const { fetchData, fetchAvailableAgents } = useAgentsStore();

  const { endCall } = useQueueCallsStore();

  const { showToastMessage } = useToast();

  const handleEndCallClick = async () => {
    let response = null;

    try {
      response = await endCall(activeCall._id);
      await fetchData();
      await fetchAvailableAgents();
      showToastMessage(response.message, "success");
    } catch (err) {
      console.err(err);
      showToastMessage(err.message, "error");
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`${
        availableForCall ? "bg-green-400" : "bg-red-200"
      }  p-1 text-center flex justify-center items-center`}
    >
      <span className="mr-2">
        {!availableForCall ? (
          <FontAwesomeIcon icon={faX} color="red" />
        ) : (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </span>

      <div>
        {name}{" "}
        {availableForCall ? (
          <Badge bg="success">Avail</Badge>
        ) : (
          <span>
            <FontAwesomeIcon icon={faArrowRight} /> {currentCaller?.name} /{" "}
            {currentCaller?.phoneNumber}
          </span>
        )}
      </div>

      <div className="ms-auto flex gap-1">
        {!availableForCall && (
          <CustomButton
            title="End Call"
            func={handleEndCallClick}
            variant="danger"
          />
        )}
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
