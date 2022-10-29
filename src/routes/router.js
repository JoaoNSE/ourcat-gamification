const express = require("express");

const courseRoutes = require("./course.routes");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.use(authRoutes);
router.use(courseRoutes);

module.exports = router;
