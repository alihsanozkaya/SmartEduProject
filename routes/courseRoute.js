const express = require("express");
const courseControllers = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware")

const router = express.Router();

router.route("/").post(roleMiddleware(["teacher", "admin"]), courseControllers.createCourse);
router.route("/").get(courseControllers.getAllCourses);
router.route("/:slug").get(courseControllers.getCourse);

module.exports = router;