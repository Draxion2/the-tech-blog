const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
// dashboard routes

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
// use dashboard routes

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;