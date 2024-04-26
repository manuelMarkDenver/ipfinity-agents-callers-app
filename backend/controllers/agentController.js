
// @desc Get Agent
// @route /api/agent/
// @access Public
export const getAgent = (req, res) => {
  res.status(200).json({ message: "Get agent" });
};


// @desc Get list gents
// @route /api/agent/list
// @access Public
export const getAgents = (req, res) => {
  res.status(200).json({ message: "Get list of agents" });
};

