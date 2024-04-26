import asyncHandler from "express-async-handler";

const checkId = asyncHandler(async (id, model) => {
  const exist = await model.findById(id);
  return exist || false; // Return false if exist is falsy
});

const idExistChecker = (model) => async (req, res, next) => {
  let id = null;
  if (model === 'QueueCallsModel') id = Object.entries(req.params)[0][1];
  try {
    const exist = await checkId(id, model);
    if (!exist) {
      res.status(400);
      throw new Error("Resource not found or invalid ID");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default idExistChecker;
