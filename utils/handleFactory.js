const AppError = require("./appError");
const APIFeatures = require("./apiFeatures");
const Prescription = require("../models/Prescription");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = { _id: req.params.id };
    let query = Model.find(filter);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create({ ...req.body });

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updatePrescription = () => async (req, res, next) => {
  try {
    consoel.log("req.body", req.body);
    const user = req.body.user;
    delete req.body.user;
    const doc = await Prescription.findByIdAndUpdate(user, { ...req.body });
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserPrescription = () => async (req, res, next) => {
  try {
    const user = req.body.user;
    delete req.body.user;
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
  deleteOne,
  createOne,
  catchAsync,
  updatePrescription,
};
