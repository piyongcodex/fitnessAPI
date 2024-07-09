const express = require("express");
const workoutController = require("../controllers/workout");

const { verify } = require("../auth");

const router = express.Router();

router.post("/", verify, workoutController.addItem);
router.get("/getMyWorkouts", verify, workoutController.getAllWorkouts);
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);
router.patch("/completeWorkout/:id", verify, workoutController.completeWorkout);
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);

module.exports = router;
