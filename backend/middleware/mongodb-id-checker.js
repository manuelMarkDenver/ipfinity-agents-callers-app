import mongoose from "mongoose";

const mongoIdChecker = (req, res, next) => {
  const entries = Object.entries(req.params);
  if (entries.length > 0) {
    const [paramName, paramValue] = entries[0];

    if (!mongoose.Types.ObjectId.isValid(paramValue)) {
      res.status(400);
      throw new Error(`Invalid ${paramName}`);
    }
  }

  next();
};

export default mongoIdChecker;
