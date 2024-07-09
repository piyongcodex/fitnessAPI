const Workout = require("../models/Workout");

module.exports.addItem = (req, res) => {
  console.log(req.user.id);
  let newWorkout = new Workout({
    userId: req.user.id,
    name: req.body.name,
    duration: req.body.duration,
  });

  newWorkout
    .save()
    .then((savedItem) => res.status(201).send(savedItem))
    .catch((saveErr) => {
      console.error("Error in saving the item: ", saveErr);
      return res.status(500).send({ error: "Failed to save the item" });
    });
};

module.exports.getAllItems = (req, res) => {
  Workout.find({ userId: req.user.id })
    .then((workouts) => {
      if (workouts.length > 0) {
        return res.status(200).send({ workouts });
      } else {
        return res.status(200).send({ message: "No items found." });
      }
    })
    .catch((err) => res.status(500).send({ error: "Error finding items." }));
};
module.exports.updateWorkout = (req, res) => {
  let workoutUpdates = {
    name: req.body.name,
    duration: req.body.duration,
    status: req.body.status,
  };

  return Workout.findByIdAndUpdate(req.params.id, workoutUpdates)
    .then((updatedWorkout) => {
      if (!updatedWorkout) {
        return res.status(404).send({ error: "Item not found" });
      }

      return res.status(200).send({
        message: "Workout updated successfully",
        updatedWorkout: updatedWorkout,
      });
    })
    .catch((err) => {
      console.error("Error in updating an Workout : ", err);
      return res.status(500).send({ error: "Error in updating an Workout." });
    });
};

module.exports.deleteWorkout = (req, res) => {
  return Workout.deleteOne({ _id: req.params.id })
    .then((deletedResult) => {
      if (deletedResult < 1) {
        return res.status(400).send({ error: "No Item deleted" });
      }

      return res.status(200).send({
        message: "Workout deleted successfully",
      });
    })
    .catch((err) => {
      console.error("Error in deleting an Item : ", err);
      return res.status(500).send({ error: "Error in deleting an Item." });
    });
};

module.exports.completeWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).send({ error: "Item not found" });
    }

    workout.status = "completed";
    await workout.save();

    return res.status(200).send({
      message: "Workout status updated successfully",
      updatedWorkout: workout,
    });
  } catch (err) {
    console.error("Error in updating the Workout:", err);
    return res.status(500).send({ error: "Error in updating the Workout." });
  }
};
