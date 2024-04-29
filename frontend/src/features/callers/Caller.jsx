import PropTypes from "prop-types";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import AgentsDropdown from "./_components/AgentsDropdown";
import { useBoundStore } from "../../stores/useBoundStore";
import { useToast } from "../../../hooks/useToast";

const Caller = ({ caller }) => {
  const { deleteCaller } = useBoundStore();
  const { showToastMessage } = useToast();

  const deleteSelectedCaller = async (callerId, queueId) => {
    let response = null;

    if (window.confirm("Are you sure you want to delete this agent?")) {
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
    <Stack className={`p-2`} direction="horizontal" gap={3}>
      <FontAwesomeIcon icon={faUser} color="black" />
      <p className="m-0">{caller?.callerId?.name}</p> {" / "}
      <FontAwesomeIcon icon={faPhone} color="green" />
      <p className="m-0">{caller?.callerId?.phoneNumber}</p>
      <Stack className="ms-auto" direction="horizontal" gap={3}>
        <Button
          variant="danger"
          onClick={() =>
            deleteSelectedCaller(caller?.callerId?._id, caller?._id)
          }
        >
          <FontAwesomeIcon icon={faTrashCan} color="white" size="lg" />
        </Button>
        <AgentsDropdown inQueueCall={caller} />
      </Stack>
    </Stack>
  );
};

Caller.propTypes = {
  caller: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    callerId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Caller;
