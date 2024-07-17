const express = require("express");
const courseControllers = require("../controllers/courseController");

const router = express.Router();

router.route("/").post(courseControllers.createCourse);
router.route("/").get(courseControllers.getAllCourses);
router.route("/:slug").get(courseControllers.getCourse);

module.exports = router;