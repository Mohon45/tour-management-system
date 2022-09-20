const {
  getToursService,
  createTourService,
  getTourDetailsByIdService,
  updateTourByIdService,
  getTopThreeTrendingTourService,
  getTopThreeCheapestTourService,
} = require("../services/tour.services");

exports.getTours = async (req, res) => {
  try {
    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getToursService(queries);

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const result = await createTourService(req.body);

    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.getTourDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getTourDetailsByIdService(id);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.updateTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateTourByIdService(id, req.body);

    res.status(200).json({
      stauts: "success",
      message: "Successfully updated the Tour",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the tour",
      error: error.message,
    });
  }
};

exports.getTopThreeTrendingTour = async (req, res) => {
  try {
    const result = await getTopThreeTrendingTourService();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getTopThreeCheapestTour = async (req, res) => {
  try {
    const result = await getTopThreeCheapestTourService();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};
