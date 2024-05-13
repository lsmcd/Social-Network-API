const router = require("express").Router()
const userRoutes =  require("./userRoutes");

router.use("/users", userRoutes);

router.use((req, res) => {
  return res.status(404).send("Nonexistent route");
});

module.exports = router;