import PropTypes from "prop-types";
import { Dropdown, DropdownButton } from "react-bootstrap";

const AgentsDropdown = ({ agents }) => {
  const handleClick = (agent) => {
    alert(JSON.stringify(agent));
  };

  return (
    <DropdownButton id="dropdown-basic-button" title="Agents" size="sm">
      {agents &&
        Array.isArray(agents) &&
        agents?.map((agent) => (
          <Dropdown.Item onClick={() => handleClick(agent)} key={agent._id}>
            {agent?.name}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
};

AgentsDropdown.propTypes = {
  agents: PropTypes.array.isRequired,
};

export default AgentsDropdown;
