const Tour = require("../models/tour.model");

exports.getToursService = async (queries) => {
  const tours = await Tour.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  return tours;
};

exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

exports.getTourDetailsByIdService = async (tourId) => {
  await Tour.findOneAndUpdate({ _id: tourId }, { $inc: { viewCount: 1 } });
  const tour = await Tour.find({ _id: tourId });
  return tour;
};

exports.updateTourByIdService = async (tourId, data) => {
  const tour = await Tour.findById(tourId);
  const result = await tour.set(data).save();

  return result;
};

exports.getTopThreeTrendingTourService = async () => {
  const trendingTours = await Tour.find({}).sort({ viewCount: -1 }).limit(3);
  return trendingTours;
};

exports.getTopThreeCheapestTourService = async () => {
  const cheapestTours = await Tour.find({}).sort({ price: 1 }).limit(3);
  return cheapestTours;
};
