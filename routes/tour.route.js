const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router
  .route("/tours")
  .get(tourController.getTours)
  .post(tourController.createTour);
router.route("/tours/:id").get(tourController.getTourDetailsById);
router.route("/tour/:id").patch(tourController.updateTourById);
router.route("/tour/trending").get(tourController.getTopThreeTrendingTour);
router.route("/tour/cheapest").get(tourController.getTopThreeCheapestTour);

module.exports = router;
