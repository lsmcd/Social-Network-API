const router = require("express").Router()
const {postUser, getAllUsers, putUser, deleteUser, getUser} = require("../../controllers/userController")

router.route("/").post(postUser).get(getAllUsers);

router.route("/:id").put(putUser).delete(deleteUser).get(getUser);

router.use((req, res) => {
  return res.status(404).send("Nonexistent route");
});

module.exports = router;