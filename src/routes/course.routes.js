const express = require("express");

const db = require("../models");
const CourseService = require("../service/course.service");
const CourseController = require("../controller/course.controller");

const router = express.Router();

const courseService = new CourseService(db);
const courseController = new CourseController(courseService);

router.get("/courses/", courseController.getAllCourses.bind(courseController));
router.get("/courses/:id", courseController.getCourse.bind(courseController));
router.put(
  "/courses/:id",
  courseController.updateCourse.bind(courseController)
);
router.post("/courses", courseController.createCourse.bind(courseController));
// router.delete("/:id", courseController.deleteCourse.bind(courseController));
router.get(
  "/courses/:id/modules",
  courseController.getCourseModulesById.bind(courseController)
);

router.post("/modules", courseController.createModule.bind(courseController));
router.get(
  "/modules/:moduleId",
  courseController.getModuleById.bind(courseController)
);
router.put(
  "/modules/:moduleId",
  courseController.updateModuleById.bind(courseController)
);
// router.delete('/module/:moduleId', courseController.deleteModuleById.bind(courseController));

module.exports = router;
