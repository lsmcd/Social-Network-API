const router = require("express").Router()
const userRoutes = require("./userRoutes");
const thoughtRoutes = require ("./thoughtRoutes")

router.use("/users", userRoutes);

router.use("/thoughts", thoughtRoutes);

router.use((req, res) => {
  return res.status(404).send("Nonexistent route");
});

module.exports = router;