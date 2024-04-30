import PropTypes from "prop-types";

import { Stack, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import CustomButton from "../../components/CustomButton";
import { useToast } from "../../../hooks/useToast";
import { useBoundStore } from "../../stores/useBoundStore";
import AgentTimer from "./_components/AgentTimer";

const Agent = ({ agent }) => {
  const { _id: id, activeCall, name, availableForCall, currentCaller } = agent;
  const { endCall, deleteAgent, fetchAgentsData } = useBoundStore();
  const { allQueueCalls } = useBoundStore();

  const filterAgentQueueCall = allQueueCalls?.filter(
    (queueCall) =>
      queueCall?.agentId?._id === id &&
      queueCall.callerId?._id === currentCaller?._id
  );
  const { showToastMessage } = useToast();

  const handleEndCallClick = async () => {
    let response = null;

    try {
      response = await endCall(activeCall._id);
      await fetchAgentsData();
      showToastMessage(response.message, "success");
    } catch (err) {
      console.error(err);
      showToastMessage(err.message, "error");
    }
  };

  const handleClickDeleteAgent = async (agentId) => {
    let response = null;

    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        response = await deleteAgent(agentId);
        showToastMessage(response.message, "success");
      } catch (err) {
        console.error(err);
        showToastMessage(err.message, "error");
      }
    }
  };

  const callerCellContent = (content) => {
    if (availableForCall) {
      return (
        <div className="text-center">
          <p className="m-0">--</p>
        </div>
      );
    }

    return (
      <div className="text-center">
        <p className="m-0">{content}</p>
      </div>
    );
  };

  return (
    // <Stack
    //   direction="horizontal"
    //   className={`${
    //     availableForCall ? "bg-green-400" : "bg-red-200"
    //   }  px-2 py-1 text-center flex justify-center items-center`}
    // >
    //   <Stack direction="horizontal" className="flex items-center">
    //     <p className="m-0">{name}</p>
    //     {availableForCall ? (
    //       <Stack direction="horizontal" className="flex justify-between">
    //         <Badge bg="primary" className="ml-2">
    //           Avail
    //         </Badge>
    //       </Stack>
    //     ) : (
    //       <span>
    //         <FontAwesomeIcon icon={faArrowRight} /> {currentCaller?.name} /{" "}
    //         {currentCaller?.phoneNumber}
    //       </span>
    //     )}
    //   </Stack>

    //   <div className="ms-auto flex gap-1">
    //     {!availableForCall ? (
    //       <CustomButton
    //         title="End Call"
    //         func={handleEndCallClick}
    //         variant="danger"
    //       />
    //     ) : (
    //       <Button
    //         className="ms-auto"
    //         variant="danger"
    //         onClick={() => handleClickDeleteAgent(id)}
    //       >
    //         <FontAwesomeIcon icon={faTrashCan} color="white" size="sm" />
    //       </Button>
    //     )}
    //   </div>
    // </Stack>
    <tr>
      {/* call ID */}
      <td>
        <p className="m-0">
          {availableForCall ? (
            <Badge bg="success" className="ml-2 py-3 px-2">
              Available{" "}
            </Badge>
          ) : (
            <Badge bg="danger" className="ml-2 py-3 px-2">
              On Call{" "}
            </Badge>
          )}
        </p>
      </td>

      <td>
        <p className="m-0">{id}</p>
      </td>

      {/* name  */}
      <td>
        <p className="m-0">{name}</p>
      </td>

      {/* current caller name */}
      <td>{callerCellContent(currentCaller?.name)}</td>
      {/* current caller phone number */}

      {/* timer elapsed in queue  */}
      <td>{callerCellContent(currentCaller?.phoneNumber)}</td>

      <td>
        {currentCaller &&
        filterAgentQueueCall &&
        filterAgentQueueCall[0]?.callStartTime ? (
          <p className="m-0">
            {
              <AgentTimer
                startTimeOnCall={filterAgentQueueCall[0]?.callStartTime}
              />
            }
          </p>
        ) : (
          <p>--</p>
        )}
      </td>

      {/* Actions  */}
      <td className=" ">
        {availableForCall ? (
          <Stack className="ms-auto" direction="horizontal" gap={3}>
            <Button variant="danger" onClick={() => handleClickDeleteAgent(id)}>
              <FontAwesomeIcon icon={faTrashCan} color="white" size="lg" />
            </Button>
          </Stack>
        ) : (
          <CustomButton
            title="End Call"
            func={handleEndCallClick}
            variant="outline-danger"
          />
        )}
      </td>
    </tr>
  );
};

Agent.propTypes = {
  agent: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    activeCall: PropTypes.object,
    availableForCall: PropTypes.bool.isRequired,
    currentCaller: PropTypes.object,
  }).isRequired,
};

export default Agent;
