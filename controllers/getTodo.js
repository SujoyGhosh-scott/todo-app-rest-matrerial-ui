const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.getDaily = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }

    res.status(201).json({
      success: "true",
      data: user.dailyTask,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRandom = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }

    res.status(201).json({
      success: "true",
      data: user.randomTask,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFuture = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }

    res.status(201).json({
      success: "true",
      data: user.futureTask,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNotes = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }

    res.status(201).json({
      success: "true",
      data: user.notes,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjects = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }

    res.status(201).json({
      success: "true",
      data: user.projects,
    });
  } catch (error) {
    next(error);
  }
};
