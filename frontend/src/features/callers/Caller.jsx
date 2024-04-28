import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone } from "@fortawesome/free-solid-svg-icons";

import AgentsDropdown from "./_components/AgentsDropdown";

const Caller = ({ caller }) => {
  return (
    <Stack className={`p-2`} direction="horizontal" gap={3}>
      <FontAwesomeIcon icon={faUser} color="black" />
      <p className="m-0">{caller?.callerId?.name}</p> {" / "}
      <FontAwesomeIcon icon={faPhone} color="green" />
      <p className="m-0">{caller?.callerId?.phoneNumber}</p>
      <div className="ms-auto">
        <AgentsDropdown inQueueCall={caller} />
      </div>
    </Stack>
  );
};

Caller.propTypes = {
  caller: PropTypes.shape({
    callerId: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Caller;
