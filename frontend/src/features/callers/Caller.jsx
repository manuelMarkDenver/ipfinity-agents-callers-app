import PropTypes from "prop-types";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import AgentsDropdown from "./_components/AgentsDropdown";
import { useBoundStore } from "../../stores/useBoundStore";
import { useToast } from "../../../hooks/useToast";
import CallerTimer from "./_components/CallerTimer";

const Caller = ({ call }) => {
  const { deleteCaller } = useBoundStore();
  const { showToastMessage } = useToast();

  const deleteSelectedCaller = async (callerId, queueId) => {
    let response = null;

    if (window.confirm("Are you sure you want to delete this caller?")) {
      try {
        response = await deleteCaller(callerId, queueId);
        showToastMessage(response.message, "success");
      } catch (err) {
        console.error(err);
        showToastMessage(err.message, "error");
      }
    }
  };

  return (
    <tr>
      {/* call ID */}
      <td>
        <p className="m-0">{call?._id}</p>
      </td>

      {/* name  */}
      <td>
        <p className="m-0">{call?.callerId?.name}</p>
      </td>

      {/* phone number  */}
      <td>
        <p className="m-0">{call?.callerId?.phoneNumber}</p>
      </td>

      {/* timer elapsed in queue  */}
      <td>
        <p className="m-0">
          {<CallerTimer startTimeInQueue={call?.createdAt} type="caller" />}
        </p>
      </td>

      {/* Actions  */}

      <td>
        <Stack className="ms-auto" direction="horizontal" gap={3}>
          <Button
            variant="danger"
            onClick={() => deleteSelectedCaller(call?.callerId?._id, call?._id)}
          >
            <FontAwesomeIcon icon={faTrashCan} color="white" size="lg" />
          </Button>
          <AgentsDropdown inQueueCall={call} />
        </Stack>
      </td>
    </tr>
  );
};

Caller.propTypes = {
  call: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    callerId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Caller;
