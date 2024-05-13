const router = require("express").Router()
const {getAllThoughts, postThought, getThought, putThought, deleteThought} = require("../../controllers/thoughtController")

router.route("/").get(getAllThoughts).post(postThought);

router.route("/:id").get(getThought).put(putThought).delete(deleteThought);

router.use((req, res) => {
  return res.status(404).send("Nonexistent route");
});

module.exports = router;