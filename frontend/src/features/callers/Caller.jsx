import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";

import AgentsDropdown from "./_components/AgentsDropdown";

const Caller = ({ caller }) => {
  return (
    <Stack className={`p-2`} direction="horizontal" gap={3}>
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
      phoneNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Caller;
