class CourseController {
  /**
   * @param {import('../service/course.service').CourseService} courseService
   */
  constructor(courseService) {
    /**
     * @type {import('../service/course.service').CourseService}
     */
    this.courseService = courseService;
  }

  async getAllCourses(req, res, next) {
    try {
      const courses = await this.courseService.findAllCourses();
      return res.status(200).json({ courses });
    } catch (error) {
      next(error);
    }
  }

  async getCourse(req, res, next) {
    try {
      const course = await this.courseService.findCourseById(req.params.id);

      if (!course) {
        return res.status(404);
      }

      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const { badgeImageRef, name, description } = req.body;
      const newCourse = await this.courseService.updateCourseById(
        req.params.id,
        badgeImageRef,
        name,
        description
      );

      if (newCourse == null) {
        return res.status(404);
      }

      return res.status(202).json(newCourse);
    } catch (error) {
      next(error);
    }
  }

  async createCourse(req, res, next) {
    try {
      const { badgeImageRef, name, description } = req.body;
      const course = await this.courseService.insertCourse(
        badgeImageRef,
        name,
        description
      );
      return res.json(course);
    } catch (error) {
      next(error);
    }
  }

  async getCourseModulesById(req, res, next) {
    try {
      const modules = await this.courseService.findCourseModules(req.params.id);
      res.status(200).json({ modules });
    } catch (error) {
      next(error);
    }
  }

  async createModule(req, res, next) {
    try {
      const module = await this.courseService.insertModule(
        req.body.courseId,
        req.body.title,
        req.body.content,
        req.body.experience
      );
      res.json(module);
    } catch (error) {
      next(error);
    }
  }

  async getModuleById(req, res, next) {
    try {
      const module = await this.courseService.findModuleById(
        req.params.moduleId
      );
      res.json(module);
    } catch (error) {
      next(error);
    }
  }

  async updateModuleById(req, res, next) {
    try {
      const id = req.params.moduleId;
      const { content, title, experience, courseId } = req.body;

      const module = await this.courseService.updateModuleContent(
        id,
        content,
        title,
        experience,
        courseId
      );

      if (module == null) {
        return res.status(404);
      }

      res.status(202).json(module);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseController;