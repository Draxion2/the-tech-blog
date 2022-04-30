const router = require("express").Router();

const apiRoutes = require("./api");
// home routes
// dashboard routes

router.use("/api", apiRoutes);
// use home routes
// use dashboard routes

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;